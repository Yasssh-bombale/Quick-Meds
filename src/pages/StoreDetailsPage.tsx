// import StoreOrderForm from "@/forms/store-forms/StoreOrderForm";
import { useGetStoreDetails } from "@/api/store-apis";
import Conversation from "@/components/Conversation";
import StoreInputPrescription, {
  prescriptionFormData,
} from "@/components/StoreInputPrescription";
import { useAppContext } from "@/context/Conversation.context";
// import StoreOrderForm from "@/forms/store-forms/StoreOrderForm";
import { useAppSelector } from "@/hooks";
import { socket } from "@/main";
import { RootState } from "@/store/store";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useParams } from "react-router-dom";

export type Conversations = {
  _id: string;
  storeId: string;
  userId: string;
  senderName: string;
  senderProfile: string;
  type?: "message" | "order";
  role: "user" | "owner";
  message: string;
  prescriptionImage?: string;
  amount: string;
  isOrdered: boolean;
  paymentMode: "online" | "cash";
  createdAt: string;
  updatedAt: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StoreDetailsPage = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);

  const { id: storeId } = useParams(); //getting id of store as storeId;
  if (!user || !storeId) {
    return <Navigate to={"/signin"} />;
  }
  const { store } = useGetStoreDetails(storeId); //for showing storeDetails;
  //for creating messages;
  const { _id: userId } = user;
  //create conversation;
  const [loading, setLoading] = useState<boolean>(false);
  const [isOwnerOnline, setOwnerOnline] = useState<boolean>(false);
  const { conversations, setConversations } = useAppContext();

  console.log(isOwnerOnline);

  const fetchConversationReq = async () => {
    const params = new URLSearchParams();
    params.set("userId", userId);
    params.set("storeId", storeId);
    const response = await fetch(
      `${API_BASE_URL}/api/conversation/get?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch conversations");
    }
    const data = await response.json();
    setConversations(data);
    return data;
  };

  const createMessage = async (formData: prescriptionFormData) => {
    setLoading(true);
    const res = await fetch(
      `${API_BASE_URL}/api/conversation/create?userId=${userId}&storeId=${storeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      throw new Error("Could not create message");
    }
    setLoading(false);
    const data = await res.json();
    setConversations((prev) => [...prev, data]);
    return data;
  };

  const {} = useQuery("fetchConversations", fetchConversationReq);
  const queryClient = useQueryClient();
  const { mutateAsync: sendMessage } = useMutation(createMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchConversations"]);
    },
  });

  useEffect(() => {
    socket.on("ownerStatus", ({ storeId: incommingStoreId, isOnline }) => {
      if (incommingStoreId === storeId) {
        setOwnerOnline(isOnline);
      }
    });
    // Cleanup on component unmount
    return () => {
      socket.off("ownerStatus");
    };
  }, []);

  return (
    <div className="flex mt-[-20px] md:divide-x-2 md:divide-double  divide-purple-600 gap-2 p-2 -ml-7 sm:ml-0 overflow-hidden border border-zinc-300 rounded-md">
      {/* <StoreOrderForm /> */}
      {/* leftSection */}

      <div className="max-w-96 w-full h-fit hidden md:flex flex-col border border-zinc-300 p-2 rounded-md">
        <img src={store?.imageUrl} alt="storeImage" className="w-full h-64" />
        <h1 className="text-lg font-semibold tracking-tight text-nowrap overflow-hidden capitalize">
          {store?.storeName}
          <span className="text-zinc-500 ml-3 font-light text-sm">
            ({store?.city})
          </span>
        </h1>
        {/* Owner name */}
        <p>Owner: {store?.ownerName}</p>
        <p className="flex items-center">
          Contact No <Phone className="ml-1" size={16} />
          :+91{store?.mobileNumber}
        </p>
        <p>Address : {store?.address}</p>
      </div>

      {/* rightSection */}
      <div className="flex flex-col w-full">
        {/* main border zinc */}
        <div className="w-full  ml-1  rounded-md flex flex-col flex-1 px-3">
          {/* storeName */}
          <h1 className="text-3xl capitalize border-b p-1 border-zinc-300 mb-2">
            {store?.storeName} | <span className="text-xl">{store?.city}</span>
          </h1>
          {/* conversaitons  */}
          <Conversation conversations={conversations} height="h-96" />
          {/* input form for prescription */}
          <StoreInputPrescription
            onSave={sendMessage}
            isLoading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsPage;
