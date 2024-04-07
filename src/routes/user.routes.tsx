import CreateTodo from "@/pages/User/Create-todos";
import Todos from "@/pages/User/Todos";
import UserDashboard from "@/pages/User/UserDashboard";

export const UserPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "To-Do's",
    children: [
      {
        name: "create todo",
        path: "create-todo",
        element: <CreateTodo />,
      },
      {
        name: "My Todos",
        path: "todos",
        element: <Todos />,
      },
    ],
  },
];
