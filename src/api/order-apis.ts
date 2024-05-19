import { prescriptionFormData } from "@/components/StoreInputPrescription";
import { Order, OrderOwners } from "@/types";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateOrder = (storeId: string, userId: string) => {
  const params = new URLSearchParams();
  params.set("storeId", storeId);
  params.set("userId", userId);

  const createOrderRequest = async (formData: prescriptionFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/order/create/?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 403) {
      throw new Error(
        "Your shipping address is missing kindly update your profile"
      );
    }

    return response.json();
  };

  const {
    mutate: createOrder,
    isLoading,
    error,
    isSuccess,
  } = useMutation("createOrder", createOrderRequest);

  if (error) {
    toast.error((error as string) || "Unable to create order");
  }
  if (isSuccess) {
    toast.success("Order created");
  }

  return { createOrder, isLoading };
};

export const useGetMyOrdersForStore = (userId: string, storeId: string) => {
  const params = new URLSearchParams();
  params.set("userId", userId);
  params.set("storeId", storeId);

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/order/my/get/?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("ERROR:fetching orders for current user");
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    ["getMyOrdersForStore", storeId],
    getMyOrdersRequest
  );
  return { orders, isLoading };
};

export const useGetOrdersForOwners = (userId: string) => {
  const getOrdersRequest = async (): Promise<OrderOwners> => {
    const response = await fetch(
      `${API_BASE_URL}/api/order/store-owner/${userId}`
    );
    if (!response.ok) {
      throw new Error("ERROR:Fetching orders for owners");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(
    ["fetchOrdersForOwners"], //fetch new data of orders whenever orderIsPlaced is changed;
    getOrdersRequest
  );

  return { data, isLoading };
};

//getting orders for current user from all stores;
export const useGetOrdersFromAllStores = (userId: string) => {
  const getAllOrdersFromAllStores = async () => {
    const response = await fetch(`${API_BASE_URL}/api/order/my/all/${userId}`);
    if (!response.ok) {
      throw new Error("Could not fetch orders");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(
    "fetchAllOrdersFromAllStores",
    getAllOrdersFromAllStores
  );
  return { data, isLoading };
};
