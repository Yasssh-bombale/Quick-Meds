import { Conversations } from "@/pages/StoreDetailsPage";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchStoreConversations = (
  userId: string,
  clickedUserId?: string
) => {
  const fetchStoreConversationsRequest = async (): Promise<Conversations[]> => {
    const params = new URLSearchParams();
    params.set("userId", userId);
    console.log(clickedUserId);
    if (clickedUserId) {
      params.set("clickedUserId", clickedUserId);
    }
    const res = await fetch(
      `${API_BASE_URL}/api/conversation/store/get?${params.toString()}`
    );
    if (!res.ok) {
      throw new Error("Could not fetch store conversations");
    }
    return res.json();
  };

  const { data: conversations, isLoading } = useQuery(
    ["fetchStoreConversationsRequest", clickedUserId],
    fetchStoreConversationsRequest
  );

  return { conversations, isLoading };
};
