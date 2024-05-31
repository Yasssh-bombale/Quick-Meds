import { useCheckUserHasStore } from "@/api/store-apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import NotFound from "./NotFound";
import { Outlet } from "react-router-dom";

const ManageStoreRoute = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );
  const { check, isLoading: checkLoading } = useCheckUserHasStore(userId);

  if (checkLoading) {
    return (
      <div className="text-center text-3xl text-purple-500 h-screen flex items-center justify-center">
        Loading...! plz wait
      </div>
    );
  }

  if (!check?.userHasStore) {
    return (
      <NotFound
        buttonText="Create store"
        linkTo="/create-store"
        message="It looks like you have not created any store yet ! lets get started
    with"
      />
    );
  }
  return <Outlet />;
};

export default ManageStoreRoute;
