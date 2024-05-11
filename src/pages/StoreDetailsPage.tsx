import StoreOrderForm from "@/forms/store-forms/StoreOrderForm";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Navigate } from "react-router-dom";

const StoreDetailsPage = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);
  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="flex justify-center mt-[-20px]">
      <StoreOrderForm />
    </div>
  );
};

export default StoreDetailsPage;
