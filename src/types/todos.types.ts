export type TTask = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
  // isCompleted?: boolean;
  status: string;
  author: string;
};
