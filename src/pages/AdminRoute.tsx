import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = useAppSelector((state: RootState) => state.userState.user);

  return user.isAdmin ? <Outlet /> : <Navigate to={"/"} />;
};

export default AdminRoute;
