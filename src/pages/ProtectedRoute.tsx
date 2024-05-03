import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
