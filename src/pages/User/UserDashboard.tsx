import { selectCurrentUser } from "@/redux/features/authApi/authSlice";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector(selectCurrentUser);

  // const { data: getUsersTodo } = useGetUsersTodoQuery(user?._id);

  // console.log(getUsersTodo);
  return <div>{user?.username}'s Dashboard</div>;
};

export default UserDashboard;
