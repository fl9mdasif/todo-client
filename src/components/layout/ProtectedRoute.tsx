/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  useCurrentToken,
} from "../../redux/features/authApi/authSlice";
import { verifyToken } from "../../utils/VerifyToken";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const token = useAppSelector(useCurrentToken);

//   if (!token) {
//     return <Navigate to="/login" replace={true} />;
//   }

//   return children;
// };

// export default ProtectedRoute;

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
