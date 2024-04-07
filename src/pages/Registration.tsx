/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Checkbox, Form, Input, Select } from "antd";
import { useRegisterMutation } from "../redux/features/authApi/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
// validate phone number
// const validatePhoneNumber = (_: any, value: string) => {
//   const phoneNumberRegex = /^\d{11}$/; // 11 digits
//   return phoneNumberRegex.test(value)
//     ? Promise.resolve()
//     : Promise.reject(new Error("Please input a valid 11-digit phone number!"));
// };

const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const navigateReg = () => {
    navigate("/login");
  };

  // register
  const onFinish = async (values: any) => {
    const { confirm, ...userDataWithoutConfirm } = values;

    const toastId = toast.loading("Loading...");
    // console.log(data, toastId);
    try {
      console.log("Received values of form: ", userDataWithoutConfirm);

      const res = await register(userDataWithoutConfirm).unwrap();
      console.log("res", res);
      if (res.success == true) {
        toast.success("User registration successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate(`/login`);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(`userName is already used`, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] ">
      <div>
        <div className="flex items-center justify-center">
          <h1 className="bold  text-xl">Welcome to Registration </h1>
        </div>
        <div className=" ">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            style={{ padding: 30, maxWidth: 670 }}
            scrollToFirstError
          >
            {/* username  */}
            <Form.Item
              name="username"
              label="Username"
              tooltip="yourname, avoid white spaces"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                  whitespace: false,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/*  email */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* pass */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Pass"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* role */}
            <Form.Item label="role" name="role">
              <Select>
                {/* <Select.Option value="buyer">Buyer</Select.Option> */}
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>

            {/* Checkbox */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            {/* button */}
            <Form.Item {...tailFormItemLayout}>
              <Button
                className="px-8  text-center font-bold  bg-red-600"
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="mt-1">
          Already have a account?{" "}
          <button className="text-red-800" onClick={navigateReg}>
            Login now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
