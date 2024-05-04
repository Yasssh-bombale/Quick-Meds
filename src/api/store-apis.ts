import { storeFormData } from "@/forms/store-forms/CreateStoreForm";
import { useState } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CreateStore = (userId: string) => {
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
