/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// baseUrl: "http://localhost:5001/api/v1",
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      console.log("t", token);
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken: BaseQueryFn<
//   FetchArgs,
//   BaseQueryApi,
//   DefinitionType
// > = async (args, api, extraOptions): Promise<any> => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     //* Send Refresh
//     // console.log("Sending refresh token");
//     //https://sales-management-g3bfmqecb-md-asifs-projects.vercel.app/api/v1/auth/refresh-token
//     const res = await fetch(
//       "https://sales-management-blush.vercel.app/api/v1/auth/refresh-token",
//       {
//         method: "POST",
//         credentials: "include",
//       }
//     );

//     const data = await res.json();
//     // console.log(data.data);

//     if (data?.data?.accessToken) {
//       const user = (api.getState() as RootState).auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout()); // logout
//     }
//     await baseQuery(args, api, extraOptions);
//   }

//   return result;
// };

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,

  endpoints: () => ({}),
});
