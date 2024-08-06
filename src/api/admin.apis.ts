import { API_BASE_URL } from "@/constants";
import { Store } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";

export const useGetApplications = (userId: string) => {
  const fetchApplicationsReq = async (): Promise<Store[] | []> => {
    const res = await fetch(
      `${API_BASE_URL}/api/admin/applications?userId=${userId}`
    );
    if (!res.ok) {
      throw new Error("Could not fetch Applications");
    }

    return res.json();
  };

  const { data, isError, isLoading } = useQuery(
    "fetchPendingApplications",
    fetchApplicationsReq
  );

  if (isError) {
    toast.error("Could not fetch applications try again latter");
  }

  return { data, isLoading };
};
