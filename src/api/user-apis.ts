import { updateUserFormData } from "@/forms/user-forms/UpdateUserForm";
import { UpdatedUser } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyUser = (userId: string) => {
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

  const {
    mutateAsync: updateUser,
    isSuccess,
    error,
    isLoading,
  } = useMutation(updateMyUserRequest);

  if (error) {
    toast.error("Could not update user");
  }
  if (isSuccess) {
    toast.success("User information updated");
  }

  return { updateUser, isLoading };
};

export const useGetMyUpdatedUser = (userId: string) => {
  const getMyUpdatedUserRequest = async (): Promise<UpdatedUser> => {
    const response = await fetch(
      `${API_BASE_URL}/api/user/my/updated/${userId}`
    );
    if (!response.ok) {
      throw new Error("Could not fetch updated user");
    }
    return response.json();
  };

  const { data: user, isLoading } = useQuery(
    "getMyUpdatedUser",
    getMyUpdatedUserRequest
  );

  return { user, isLoading };
};
