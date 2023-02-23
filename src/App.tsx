import "./App.css";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: Outlet,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
  beforeLoad: ({ router }) => {
    // check if standalone and forward to dashboard
    if (isStandalone()) {
      router.navigate({
        replace: true,
        to: "/dashboard",
      });
    }
  },
});

function Index() {
  return <div className="App">Please install this app to use it!</div>;
}

const dashRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

function Dashboard() {
  return <div className="App">Log In Buddy</div>;
}

const routeTree = rootRoute.addChildren([indexRoute, dashRoute]);

const router = new Router({
  routeTree,
});

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches;
}
