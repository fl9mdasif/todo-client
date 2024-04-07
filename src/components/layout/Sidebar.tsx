/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authApi/authSlice";
import { UserPath } from "@/routes/user.routes";

const { Sider } = Layout;

const userRole = {
  USER: "user",
  // BUYER: "buyer",
  // SUPER_ADMIN: "superAdmin",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems: any;

  switch (user!.role) {
    // case "seller":
    //   sidebarItems = sidebarItemsGenerator(AdminPath, userRole.SELLER);
    //   break;
    case "user":
      sidebarItems = sidebarItemsGenerator(UserPath, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="font-bold">TODO APP</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
