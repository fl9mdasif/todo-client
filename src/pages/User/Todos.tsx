/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  // Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../types/global";
import { TTask } from "../../types/todos.types";
import { toast } from "sonner";
import Modal from "antd/es/modal/Modal";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateMutation,
} from "@/redux/features/todos/todosApi";
import { formItemLayout } from "@/constants/global";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/authApi/authSlice";

export type TTableData = Partial<TTask>;

const Todos = () => {
  const user = useSelector(selectCurrentUser);

  const [params, setParams] = useState<TQueryParam[]>([]);

  // api's
  const {
    data: todos,
    // isLoading,
    refetch,
    isFetching,
  } = useGetAllTodosQuery(params);

  // user tasks

  const tasksByAuthor = todos?.data;

  const matchedTasks: TTask[] = [];

  // Ensure tasksByAuthor is properly initialized
  if (tasksByAuthor) {
    tasksByAuthor.forEach((task) => {
      if (task.author === user?.username) {
        matchedTasks.push(task);
      }
    });
  }
  // const metaData = todos?.meta as any;

  const [update] = useUpdateMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTotoId, setSelectedTotoId] = useState<string | null>(null);
  // const [setIsUpdateModalOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Set<string>>(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  // console.log("Search Term:", metaData);
  // console.log(user);

  const openUpdateModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedTotoId(id);
    // console.log(id);
  };

  const handleUpdateModalOk = () => {
    setIsModalOpen(false);
    setSelectedTotoId(null);
  };
  const handleUpdateModalCancel = () => {
    setIsModalOpen(false);
    setSelectedTotoId(null);
  };

  // update todo
  const updateTodo = async (updatedFieldData: TTask) => {
    // console.log(productId);
    try {
      // setIsUpdateModalOpen(false);
      const toastId = toast.loading("Loading...");
      // console.log(selectedTotoId);
      // Use the createShoes mutation to handle the API call
      const res: any = await update({
        taskId: selectedTotoId as string,
        updatedData: updatedFieldData, // Correct property name
      });

      console.log("res", res);

      if (!res.data) {
        toast.error(` failed to update`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Update Todo successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };

  // update complete by button click
  const markCompleted = async (todoId: string) => {
    try {
      const toastId = toast.loading("Updating task...");
      const updatedTask: any = {
        status: "completed" as string, // Update the isCompleted field to true
      };
      const res: any = await update({
        taskId: todoId,
        updatedData: updatedTask,
      });

      if (res.data) {
        toast.success("Task updated successfully", { id: toastId });
        refetch();
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again.");
    }
  };

  // deleteMultiple todos
  const deleteMultipleProducts = async () => {
    // console.log("ll", [...selectedTodos]);
    // console.log("pIds", result);

    const productsIds = [...selectedTodos] as string[];
    const result: any = await deleteTodo(productsIds);

    setSelectedTodos(new Set());
    refetch();
    const toastId = toast.loading("Loading...");

    if (result.data.statusCode === 200) {
      toast.success("Product deleted Successfully", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  // search todo
  const onSearch = (value: string) => {
    console.log(value);
    setSearchTerm(value);
    setParams([
      { name: "title", value },
      // Add other filters as needed
    ]);
  };

  // console.log("m", todos);

  const tableData: any = matchedTasks?.map(
    ({
      _id,
      title,
      description,
      priority,
      deadline,
      authorId,
      status,
    }: any) => ({
      key: _id,
      title,
      description,
      priority,
      deadline,
      authorId,
      status,
    })
  );

  const onChangeCheckbox = (productId: any, isChecked: boolean) => {
    // console.log(selectedTodos);

    const newSelectedTodos = new Set(selectedTodos);
    if (isChecked) {
      newSelectedTodos.add(productId);
    } else {
      newSelectedTodos.delete(productId);
    }
    setSelectedTodos(newSelectedTodos);
  };

  // table
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Delete",
      key: "delete",
      render: (item) => (
        <input
          type="checkbox"
          onChange={(e) => onChangeCheckbox(item.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },

    {
      title: "Description.",
      key: "description",
      dataIndex: "description",
    },

    // priority
    {
      title: "Priority",
      key: "priority",
      render: (item) => {
        // console.log(item);
        return (
          <div className="flex items-center gap-2">
            <p
              className={`size-3 rounded-full 
            ${item.priority === "high" ? "bg-red-500" : null} 
            ${item.priority === "medium" ? "bg-yellow-500" : null} 
            ${item.priority === "low" ? "bg-green-500" : null} 
            `}
            ></p>
            <div>{item.priority}</div>
          </div>
        );
      },
      filters: [
        {
          text: "High",
          value: "high",
        },
        {
          text: "Medium",
          value: "medium",
        },
        {
          text: "Low",
          value: "low",
        },
      ],
    },
    // deadline
    {
      title: "Deadline",
      key: "deadline",
      dataIndex: "deadline",
    },
    {
      title: "Status",
      key: "status",
      render: (item) => {
        // console.log(item);
        return (
          <div className="flex items-center gap-2">
            <p
              className={`size-3 rounded-full 
            ${item.status === "pending" ? "bg-red-500" : null} 
            ${item.status === "in-progress" ? "bg-yellow-500" : null} 
            ${item.status === "completed" ? "bg-green-500" : null} 
            `}
            ></p>
            <div>{item.status}</div>
          </div>
        );
      },
    },

    // mark completed
    {
      title: "Completed",
      key: "isCompleted",
      render: (item) => (
        <Button
          onClick={() => markCompleted(item.key)}
          disabled={item.isCompleted} // Disable button if task is already completed
        >
          ✅
        </Button>
      ),
    },
    // update modal
    {
      title: "Actions",
      key: "x",
      render: (item) => {
        // console.log(item);
        return (
          <Space>
            <Button
              onClick={() => {
                if (item.key) {
                  openUpdateModal(item.key);
                }
              }}
              // className="bg-green-600 font-bold text-white"
            >
              <BiEdit color="red" />
            </Button>
            {/* </Link> */}
            {/* up modal  */}
            <Modal
              title="update-Modal"
              open={isModalOpen}
              onOk={handleUpdateModalOk}
              onCancel={handleUpdateModalCancel}
            >
              <div>
                {/* order form */}
                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={updateTodo}
                  style={{ maxWidth: 600 }}
                >
                  {/* product Id*/}
                  <Form.Item
                    label="task Id"
                    name="_id"
                    initialValue={selectedTotoId}
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>

                  {/* {/* title/} */}
                  <Form.Item
                    label="title"
                    name="title"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="priority" name="priority">
                    <Select>
                      <Select.Option value="high">High</Select.Option>
                      <Select.Option value="medium">Medium</Select.Option>
                      <Select.Option value="low">Low</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="status" name="status">
                    <Select>
                      <Select.Option value="pending">pending</Select.Option>
                      <Select.Option value="in-progress">
                        in-progress
                      </Select.Option>
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
                    <Input />
                  </Form.Item>
                  {/* button  */}
                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                      className="bg-green-600  text-white font-bold"
                      htmlType="submit"
                    >
                      Update Task
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.priority?.forEach((item) =>
        queryParams.push({ name: "priority", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <h1 className="font-bold">Total : {matchedTasks.length} tasks</h1>
      <Input
        style={{ width: "220px" }}
        placeholder="Search by title "
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div>
        <Button
          className="bg-red-500 w-48 text-white bold-md"
          onClick={() => deleteMultipleProducts()}
        >
          Delete Selected todos
        </Button>
      </div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        // pagination={false}
        scroll={{ x: true }} // Enable horizontal scrolling
      />

      {/* <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.page}
        total={metaData?.total}
      /> */}
    </>
  );
};

export default Todos;
