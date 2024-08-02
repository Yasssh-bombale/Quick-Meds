import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCheckoutDetails = (
  conversationId: string,
  userId: string
) => {
  const params = new URLSearchParams();
  params.set("conversationId", conversationId);
  params.set("userId", userId);

  const fetchCheckoutDetails = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/conversation/getspecific?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch checkout details");
    }

    return response.json();
  };

  const { data: checkOutDetails, isLoading } = useQuery(
    "fetchCheckoutDetails",
    fetchCheckoutDetails
  );

  return { checkOutDetails, isLoading };
};
