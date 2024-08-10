import { storeFormData } from "@/forms/store-forms/CreateStoreForm";
import { storeFormData as updateStoreFormData } from "@/forms/store-forms/UpdateStoreForm";
import { HasStoreType } from "@/pages/ManageStorePage";
import { MedicalStores, Store } from "@/types";
import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateStore = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const createStoreRequest = async (formData: storeFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/store/create/${userId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error("Could not make request to create store");
    }
    return response.json();
  };
  const queryClient = new QueryClient();
  const { mutateAsync: createStore } = useMutation(createStoreRequest, {
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(["fetchMyStore"]);
    },
  });

  return { createStore, loading, setLoading };
};
export const useUpdateStore = (userId: string) => {
  const queryClient = useQueryClient();
  const updateStoreRequest = async (formData: updateStoreFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/store/update?userId=${userId}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Could not update store");
    }
  };

  const {
    mutateAsync: updateStore,
    data: updatedStoreData,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateStoreRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchMyStore"]);
    },
  });
  if (isSuccess) {
    toast.success("Store updated successfully");
  }
  if (isError) {
    toast.error("Could update store,try again latter");
  }
  return { updateStore, updatedStoreData, isLoading };
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
export const useGetAllStores = (page: number, searchQuery: string) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (searchQuery) {
    params.set("searchQuery", searchQuery);
  }
  const getStoresRequest = async (): Promise<MedicalStores> => {
    const resposne = await fetch(
      `${API_BASE_URL}/api/store/all?${params.toString()}`
    );
    // if (!resposne.ok) {
    //   throw new Error("ERROR:While fetching all stores");
    // }
    return resposne.json();
  };

  const {
    data: allStores,
    isLoading,
    refetch,
  } = useQuery(["fetchAllStores", page], getStoresRequest);

  return { allStores, refetch, isLoading };
};

export const useGetStoreDetails = (id: string) => {
  const getStoreDetailsRequest = async (): Promise<Store> => {
    const resposne = await fetch(`${API_BASE_URL}/api/store/details/${id}`);

    if (!resposne.ok) {
      throw new Error("ERROR:while fetching store detials");
    }
    return resposne.json();
  };

  const { data: store, isLoading } = useQuery(
    "getStoreDetials",
    getStoreDetailsRequest
  );

  return { store, isLoading };
};

//check hook for user has store or not;

export const useCheckUserHasStore = (userId: string) => {
  const storeCheckHandler = async (): Promise<HasStoreType> => {
    const response = await fetch(
      `${API_BASE_URL}/api/store/has-store/${userId}`
    );

    // if (!response.ok) {
    //   throw new Error("Store not found");
    // }
    return response.json();
  };

  const { data: check, isLoading } = useQuery(
    "checkUserHasStore",
    storeCheckHandler
  );
  return { check, isLoading };
};

// check store owner is online or not;
