import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routerGenerator } from "../utils/routerGenerator";
import Registration from "../pages/Registration";
import { UserPath } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <App />,
    children: routerGenerator(UserPath),
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
