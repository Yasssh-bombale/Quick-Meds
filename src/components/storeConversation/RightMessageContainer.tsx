import NotFound from "../NotFound";
import { UserNameAndDp_Type } from "@/pages/OwnerConversation";
import Conversation from "../Conversation";
import OwnerConvoInput, { ownerPrescriptionFormData } from "./OwnerConvoInput";
import { useEffect, useState } from "react";
import { Conversations } from "@/pages/StoreDetailsPage";

type Props = {
  userId: string;
  clickedUserId: string;
  clickedUserNameAndDp: UserNameAndDp_Type;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RightMessageContainer = ({
  userId,
  clickedUserId,
  clickedUserNameAndDp,
}: Props) => {
  if (!clickedUserId) {
    return <NotFound message="Select message to start" height="h-fit" />;
  }

  const [uiConversations, setUiConversations] = useState<Conversations[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // whenever owner clicks any user it will refetch their all messages on the store;
  useEffect(() => {
    const fetchStoreConversationsRequest = async () => {
      try {
        const params = new URLSearchParams();
        params.set("userId", userId);
        if (clickedUserId) {
          params.set("clickedUserId", clickedUserId);
        }
        const res = await fetch(
          `${API_BASE_URL}/api/conversation/store/get?${params.toString()}`
        );
        if (!res.ok) {
          throw new Error("Could not fetch store conversations");
        }
        const data = await res.json();
        setUiConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoreConversationsRequest();
  }, [clickedUserId]);

  const createOwnerMessage = async (formData: ownerPrescriptionFormData) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/conversation/owner/create?ownerId=${userId}&clickedUserId=${clickedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Could not create owner message");
      }
      const data = await res.json();
      setUiConversations((prev) => [...prev, data]);
      setLoading(false);
    } catch (error) {
      console.log(`ERROR:WHILE CREATING OWNER MESSAGE,${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* main border zinc */}
      <div className="w-full  ml-1  rounded-md flex flex-col flex-1 px-3">
        {/* storeName */}
        <div className="flex items-center gap-2 border-b border-zinc-300 px-2 mb-3">
          <img
            src={clickedUserNameAndDp.userProfile}
            alt="dp"
            className="w-9 h-9 object-cover border rounded-full"
          />
          <h1 className="text-3xl capitalize  p-1 mb-2">
            {clickedUserNameAndDp.userName}
          </h1>
        </div>
        {/* conversaitons  */}
        <Conversation
          owner
          conversations={uiConversations}
          height="h-[450px]"
        />
        {/* input form for storeOwner */}
        <OwnerConvoInput
          onSave={createOwnerMessage}
          isLoading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default RightMessageContainer;
