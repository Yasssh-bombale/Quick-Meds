import { updateUserFormData } from "@/forms/user-forms/UpdateUserForm";
import { UpdatedUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyUser = (
  userId: string,
  paymentMode: string,
  conversationId: string,
  storeId: string,
  setCashSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    data: updatedUserDetails,
    isSuccess,
    error,
    isLoading,
  } = useMutation(updateMyUserRequest, {
    onSuccess: () => {
      //
      queryClient.invalidateQueries(["getMyUpdatedUser"]);
    },
  });

  if (error) {
    toast.error("Could not update user,try again later");
  }
  if (isSuccess) {
    if (paymentMode === "online") {
      navigate(`/checkout/${storeId}/${conversationId}`); //convoId and storeId;
    } else {
      //create order as cash on delivery;
      createCashOrder(conversationId, paymentMode, setCashSuccess);
    }
  }

  return { updateUser, isLoading, updatedUserDetails };
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

//cash on deliveryOrder;
const createCashOrder = async (
  conversationId: string,
  paymentMode: string,
  setCashSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const params = new URLSearchParams();
    params.set("conversationId", conversationId);
    params.set("paymentMode", paymentMode);
    const res = await fetch(
      `${API_BASE_URL}/api/order/create?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Could not create order");
    }
    const data = await res.json();
    setCashSuccess(true);
    return data; //data is updated convo setted as isOrdered true;
  } catch (error) {
    console.log(`ERROR:COULD NOT CREATE ORDER,${error}`);
    setCashSuccess(false);
  }
};
