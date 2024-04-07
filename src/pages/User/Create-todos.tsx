/* eslint-disable @typescript-eslint/no-explicit-any */
import { formItemLayout } from "@/constants/global";
import { selectCurrentUser } from "@/redux/features/authApi/authSlice";
import {
  useCreateNewTaskMutation,
  useGetAllTodosQuery,
} from "@/redux/features/todos/todosApi";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CreateTodo = () => {
  const user = useSelector(selectCurrentUser);

  const { refetch } = useGetAllTodosQuery(null);

  const [createNewTask] = useCreateNewTaskMutation();

  const createTask = async (formData: any) => {
    const toastId = toast.loading("Loading...");

    try {
      // Use the createShoes mutation to handle the API call
      const res: any = await createNewTask(formData).unwrap();

      if (!res.data) {
        toast.error(`something went wrong `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Task added successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error creating tasks:", error);
      toast.error("Error creating tasks. Please try again.");
    }
  };
  return (
    <>
      <div>
        {/* task form */}
        <Form
          {...formItemLayout}
          variant="filled"
          onFinish={createTask}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="author"
            name="author"
            initialValue={user?.username}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input disabled />
          </Form.Item>
          {/* {/* title/} */}
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <Input placeholder="Enter title " />
          </Form.Item>

          <Form.Item
            label="priority"
            name="priority"
            rules={[{ required: false, message: "Please select!" }]}
          >
            <Select>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="status"
            name="status"
            rules={[{ required: false, message: "Please select!" }]}
          >
            <Select>
              <Select.Option value="pending">pending</Select.Option>
              <Select.Option value="in-progress">in-progress</Select.Option>
              <Select.Option value="completed">completed</Select.Option>
            </Select>
          </Form.Item>

          {/* {/* description/} */}
          <Form.Item
            label="description"
            name="description"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          {/* {/* deadline/} */}
          <Form.Item
            label="deadline"
            name="deadline"
            rules={[{ required: false, message: "Please input!" }]}
          >
            <Input placeholder="2024-12-28" />
          </Form.Item>
          {/* button  */}
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
              className="bg-green-600  text-white font-bold"
              htmlType="submit"
            >
              Create Tasks
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default CreateTodo;
