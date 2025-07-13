import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import HomePage from "../pages/HomePage";
import SecondPage from "@/pages/SecondPage";

// Steps to add a new route:
// 1. Create a new page component in the '../pages/' directory (e.g., NewPage.tsx)
// 2. Import the new page component at the top of this file
// 3. Define a new route for the page using createRoute()
// 4. Add the new route to the routeTree in RootRoute.addChildren([...])
// 5. Add a new Link in the navigation section of RootRoute if needed

// Example of adding a new route:
// 1. Create '../pages/NewPage.tsx'
// 2. Import: import NewPage from '../pages/NewPage';
// 3. Define route:
//    const NewRoute = createRoute({
//      getParentRoute: () => RootRoute,
//      path: '/new',
//      component: NewPage,
//    });
// 4. Add to routeTree: RootRoute.addChildren([HomeRoute, NewRoute, ...])
// 5. Add Link: <Link to="/new">New Page</Link>

export const SecondPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/second-page",
  component: SecondPage,
});

export const DashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});

export const ProjectStatusRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/status/",
  component: SecondPage
})
export const ProjectOverviewRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/projects_overview/",
  component: SecondPage
})
export const ProjectArchitectureRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/architecture/",
  component: SecondPage
})
export const ProjectLandscapeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/landscape/",
  component: SecondPage
})
export const ProjectControlCenterRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/control_center/",
  component: SecondPage
})

export const ProjectStatusItemRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/status/$projectId",
  component: SecondPage
})
export const ProjectOverviewItemRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/projects_overview/$projectId",
  component: SecondPage
})
export const ProjectArchitectureItemRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/architecture/$projectId",
  component: SecondPage
})
export const ProjectLandscapeItemRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/landscape/$projectId",
  component: SecondPage
})
export const ProjectControlCenterItemRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/project/control_center/$projectId",
  component: SecondPage
})

export const SecurityParadigmRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/security_paradigm',
  component: SecondPage
})

export const rootTree = RootRoute.addChildren([
  SecondPageRoute,
  DashboardRoute,
  ProjectStatusRoute,
  ProjectOverviewRoute,
  ProjectArchitectureRoute,
  ProjectLandscapeRoute,
  ProjectControlCenterRoute,
  SecurityParadigmRoute,
  ProjectStatusItemRoute,
  ProjectOverviewItemRoute,
  ProjectArchitectureItemRoute,
  ProjectLandscapeItemRoute,
  ProjectControlCenterItemRoute,
]);
