/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

// export type TResponse = {
export type TResponse<T> = {
  data?: T | undefined;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TPolish = {
  userId: string;
  polishType: "cream" | "wax" | "liquid";
  shineLevel: "matte " | "gloss" | "high-gloss";
  instructions?: string;
  status: "pending" | "in-progress" | "completed";
};

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
