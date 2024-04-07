import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "antd/es/radio";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/authApi/authSlice";

const { Header, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    navigate("/login");
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button onClick={handleLogOut}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
