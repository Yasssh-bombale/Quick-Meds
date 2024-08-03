import CreateStoreForm from "@/forms/store-forms/CreateStoreForm";

import img1 from "../img/createStoreImage1.png";
import {
  useCreateStore,
  useGetMyStore,
  useUpdateStore,
} from "@/api/store-apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const CreateStorePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { createStoreRequest, loading: createLoading } = useCreateStore(userId);
  const { updateStore } = useUpdateStore(userId);
  const { store } = useGetMyStore(userId);

  const userHasStore = !!store; //it will have truthy value;
  return (
    <div className="flex flex-row border-2 items-center border-[#9E3FFD] rounded-md mt-10 p-2">
      <img
        src={img1}
        alt="error"
        className="h-96 w-96 object-cover hidden md:block"
      />
      <div className="p-2  w-full ">
        <CreateStoreForm
          onSave={userHasStore ? updateStore : createStoreRequest}
          loading={createLoading}
          store={store}
        />
      </div>
    </div>
  );
};

export default CreateStorePage;
