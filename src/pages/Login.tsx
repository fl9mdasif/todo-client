/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { toast } from "sonner";
import { Button, Row } from "antd";
import PHForm from "../components/form/PhForm";
import PHInput from "../components/form/PHInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/authApi/authApi";
import { TUser, setUser } from "../redux/features/authApi/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/VerifyToken";

const Login = () => {
  const defaultValues = {
    username: "devasif96",
    password: "123456",
  };

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Loading...");
    // console.log(data, toastId);
    try {
      const userInfo = {
        username: data.username.trim(),
        password: data.password.trim(),
      };
      // console.log(userInfo);

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token as string) as TUser;

      // console.log("login", user, "res", res);

      dispatch(setUser({ user: user, token: res.data.accessToken as string }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      // navigate(`/user/dashboard`);
    } catch (error: any) {
      console.log("err: ", error);
      if (error?.data?.stack === "password") {
        toast.error(error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("username do not match", { id: toastId, duration: 2000 });
      }
    }
  };
  const navigateReg = () => {
    navigate("/registration");
  };

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div>
          <h1 className="text-2xl  font-bold py-6 text-blue-700">
            Welcome to Login
          </h1>
        </div>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="username" label="UserName:" />
          <PHInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
        </PHForm>
        <div className="mt-4">
          Don't have a account?{" "}
          <button className="text-red-800" onClick={navigateReg}>
            Register now
          </button>
        </div>
      </Row>
    </div>
  );
};

export default Login;
