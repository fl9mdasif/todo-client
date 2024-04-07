import { TRoute, TUserPath } from "../types";

export const routerGenerator = (RoutesItems: TUserPath[]) => {
  // routes
  const UserRoutes = RoutesItems.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    // console.log(item.path);

    if (item.children) {
      item.children.forEach((child) => {
        if (child.path && child.element) {
          acc.push({
            path: child.path,
            element: child.element,
          });
        }
      });
    }

    return acc;
  }, []);
  return UserRoutes;
};
