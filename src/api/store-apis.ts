import { storeFormData } from "@/forms/store-forms/CreateStoreForm";
import { Store } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateStore = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const createStoreRequest = async (formData: storeFormData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/store/create/${userId}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        if (response.status === 401) {
          return toast.error(data?.message);
        }

        return;
      }

      toast.success(data?.message);
    } catch (error) {
      console.log("ERROR_IN_CREATE-STORE-REQUEST", error);
    } finally {
      setLoading(false);
    }
  };

  return { createStoreRequest, loading };
};

export const useGetMyStore = (userId: string) => {
  const getMyStoreRequest = async (): Promise<Store> => {
    const response = await fetch(
      `${API_BASE_URL}/api/store/my/getstore/${userId}`
    );

    if (!response.ok) {
      throw new Error("Error while fetching store details");
    }

    return response.json();
  };

  const { data: store, isLoading } = useQuery(
    "fetchMyStore",
    getMyStoreRequest
  );

  return { store, isLoading };
};
