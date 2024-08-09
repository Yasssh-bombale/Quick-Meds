import img1 from "../img/createStoreImage1.png";
import { useGetMyStore, useUpdateStore } from "@/api/store-apis";
import UpdateStoreForm from "@/forms/store-forms/UpdateStoreForm";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const UpdateStorePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { updateStore, isLoading } = useUpdateStore(userId);
  const { store } = useGetMyStore(userId);

  return (
    <div className="flex flex-row border-2 items-center border-[#9E3FFD] rounded-md mt-2 p-2">
      <img
        src={img1}
        alt="error"
        className="h-96 w-96 object-cover hidden lg:block"
      />
      <div className="p-2  w-full ">
        <UpdateStoreForm
          onSave={updateStore}
          loading={isLoading}
          store={store}
        />
      </div>
    </div>
  );
};

export default UpdateStorePage;
