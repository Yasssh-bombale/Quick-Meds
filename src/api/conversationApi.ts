import { Conversations } from "@/pages/StoreDetailsPage";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchConversations = (
  userId: string,
  storeId: string,
  conversations: Conversations[]
) => {
  const params = new URLSearchParams();
  params.set("userId", userId);
  params.set("storeId", storeId);

  const fetchConversationRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/conversation/get?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch conversations");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(
    ["fetchConversation", conversations],
    fetchConversationRequest
  );

  return { data, isLoading };
};
