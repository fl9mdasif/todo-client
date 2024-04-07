const statusNames = ["pending", "in-progress", "completed"];

export const statusOptions = statusNames.map((item) => ({
  value: item,
  label: item,
}));

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
