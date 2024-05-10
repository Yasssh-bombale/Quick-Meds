import UpdateUserForm from "@/forms/user-forms/UpdateUserForm";
import img1 from "../img/createStoreImage1.png";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useGetMyUpdatedUser, useUpdateMyUser } from "@/api/user-apis";

const UserProfilePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { updateUser } = useUpdateMyUser(userId);
  const { user } = useGetMyUpdatedUser(userId);
  return (
    <div className="flex flex-row border-2 items-center border-[#9E3FFD] rounded-md mt-10 p-2">
      <img
        src={img1}
        alt="error"
        className="h-96 w-96 object-cover hidden md:block"
      />
      <div className="p-2  w-full ">
        <UpdateUserForm onSave={updateUser} updatedUser={user!} />
      </div>
    </div>
  );
};

export default UserProfilePage;
