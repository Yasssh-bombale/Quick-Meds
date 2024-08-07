import { API_BASE_URL } from "@/constants";
import { Store } from "@/types";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

export const useRejectApplications = (
  selectedReasons: string[],
  userId: string,
  storeId: string
) => {
  const params = new URLSearchParams();
  params.set("userId", userId);
  params.set("storeId", storeId);
  const navigate = useNavigate();
  const rejectApplicationRequest = async () => {
    console.log(selectedReasons);
    const res = await fetch(
      `${API_BASE_URL}/api/admin/applications/reject?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedReasons),
      }
    );

    if (!res.ok) {
      throw new Error(
        "Could not reject application at the moment try again latter"
      );
    }

    return res.json();
  };

  const { mutateAsync: rejectApplication, isLoading } = useMutation(
    rejectApplicationRequest,
    {
      onSuccess: () => {
        toast.success("Rejected successfully");
        navigate("/applications");
      },
      onError: () => {
        toast.error("Could not reject application,try again latter");
      },
    }
  );

  return { rejectApplication, isLoading };
};
export const useApproveApplication = (userId: string, storeId: string) => {
  const params = new URLSearchParams();
  params.set("userId", userId);
  params.set("storeId", storeId);
  const navigate = useNavigate();
  const approveApplicationRequest = async () => {
    const res = await fetch(
      `${API_BASE_URL}/api/admin/applications/approve?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Could not approve application at the moment try again latter"
      );
    }

    return res.json();
  };

  const { mutateAsync: approveApplication, isLoading } = useMutation(
    approveApplicationRequest,
    {
      onSuccess: () => {
        toast.success("approved successfully");
        navigate("/applications");
      },
      onError: () => {
        toast.error("Could not approve application,try again latter");
      },
    }
  );

  return { approveApplication, isLoading };
};
