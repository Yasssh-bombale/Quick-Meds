import UpdateUserForm, {
  updateUserFormData,
} from "@/forms/user-forms/UpdateUserForm";
import img1 from "../img/createStoreImage1.png";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useGetMyUpdatedUser } from "@/api/user-apis";
import { useMutation } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserProfilePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  // const { updateUser } = useUpdateMyUser(userId);
  const updateMyUserRequest = async (formData: updateUserFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/user/my/update/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("ERROR:IN UPDATING USER");
    }
    return response.json();
  };

  const { mutateAsync: updateUser, isLoading: updateLoading } =
    useMutation(updateMyUserRequest);
  const { user } = useGetMyUpdatedUser(userId);
  return (
    <div className="flex flex-row border-2 items-center border-[#9E3FFD] rounded-md mt-10 p-2">
      <img
        src={img1}
        alt="error"
        className="h-96 w-96 object-cover hidden md:block"
      />
      <div className="p-2  w-full ">
        <UpdateUserForm
          onSave={updateUser}
          updatedUser={user!}
          isLoading={updateLoading}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
