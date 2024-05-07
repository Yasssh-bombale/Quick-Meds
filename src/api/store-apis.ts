import { storeFormData } from "@/forms/store-forms/CreateStoreForm";
import { MedicalStores, Store } from "@/types";
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

// fetching all stores;
export const useGetAllStores = (page: number) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  const getStoresRequest = async (): Promise<MedicalStores> => {
    const resposne = await fetch(
      `${API_BASE_URL}/api/store/all?${params.toString()}`
    );
    if (!resposne.ok) {
      throw new Error("ERROR:While fetching all stores");
    }
    return resposne.json();
  };

  const { data: allStores, isLoading } = useQuery(
    ["fetchAllStores", page],
    getStoresRequest
  );

  return { allStores, isLoading };
};
