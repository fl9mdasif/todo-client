/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { TTask } from "../../../types/todos.types";
import { baseApi } from "../../api/baseApi";

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create
    createNewTask: builder.mutation<TTask[], void>({
      query: (taskData) => ({
        url: "/tasks/create-task",
        method: "POST",
        body: taskData,
      }),
    }),

    // get all
    getAllTodos: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/tasks`,
          // url: `/tasks/${authorId}/getUserTask`,

          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TTask[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getUsersTodo: builder.query<any, string>({
      query: (authorId) => {
        return {
          url: `/tasks/${authorId}/getUserTask`,

          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TTask[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    update: builder.mutation<TTask, { taskId: string; updatedData: TTask }>({
      query: ({ taskId, updatedData }) => ({
        url: `/tasks/${taskId}`, // Replace with your actual update endpoint
        method: "PUT",
        body: updatedData,
      }),
    }),

    deleteTodo: builder.mutation<ResponseType, string[]>({
      query: (ids) => ({
        url: `/tasks/tasksIds`,
        method: "DELETE",
        body: ids,
      }),
    }),
  }),
});

export const {
  useCreateNewTaskMutation,
  useGetAllTodosQuery,
  useUpdateMutation,
  useDeleteTodoMutation,
} = todoApi;
