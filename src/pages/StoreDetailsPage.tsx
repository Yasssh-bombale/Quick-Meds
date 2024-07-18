// import StoreOrderForm from "@/forms/store-forms/StoreOrderForm";
import { useFetchConversations } from "@/api/conversationApi";
import { useGetStoreDetails } from "@/api/store-apis";
import Conversation from "@/components/Conversation";
import OrderPrescription from "@/components/Conversation";
import StoreInputPrescription, {
  prescriptionFormData,
} from "@/components/StoreInputPrescription";
// import StoreOrderForm from "@/forms/store-forms/StoreOrderForm";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export type Conversations = {
  _id: string;
  storeId: string;
  userId: string;
  type?: "message" | "order";
  role: "user" | "owner";
  message: string;
  prescriptionImage?: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StoreDetailsPage = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);
  // const { id } = useParams();
  const { id: storeId } = useParams(); //getting id of store as storeId;
  if (!user || !storeId) {
    return <Navigate to={"/signin"} />;
  }
  const { store } = useGetStoreDetails(storeId); //for showing storeDetails;
  //for creating messages;
  const { _id: userId } = user;
  const [conversations, setConversations] = useState<Conversations[]>([]); //storing messages for updating ui frequently for better user experience;
  //create conversation;
  const [loading, setLoading] = useState<boolean>(false);

  // fetched conversation from backend;
  useEffect(() => {
    const fetchConversationReq = async () => {
      try {
        const params = new URLSearchParams();
        params.set("userId", userId);
        params.set("storeId", storeId);
        const response = await fetch(
          `${API_BASE_URL}/api/conversation/get?${params.toString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setConversations(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversationReq();
  }, []);

  const createMessage = async (formData: prescriptionFormData) => {
    try {
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

      const data = await res.json();
      if (res.ok) {
        setConversations((prev) => [...prev, data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(`ERROR:WHILE CREATING MESSAGES:${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-[-20px] md:divide-x-2 md:divide-double  divide-purple-600 gap-2 border border-zinc-300 rounded-lg p-2 overflow-hidden">
      {/* <StoreOrderForm /> */}
      {/* leftSection */}

      <div className="max-w-96 w-full h-fit flex  flex-col border border-zinc-300 p-2 rounded-md">
        <img src={store?.imageUrl} alt="storeImage" className="w-full h-64" />
        <h1 className="text-lg font-semibold tracking-tight">
          {store?.storeName}
          <span className="text-zinc-500 ml-3 font-normal">
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
        <div className="w-full border border-zinc-300 ml-1  rounded-md flex flex-col flex-1 px-3">
          {/* storeName */}
          <h1 className="text-3xl capitalize border-b p-1 border-zinc-300 mb-2">
            {store?.storeName} | <span className="text-xl">{store?.city}</span>
          </h1>
          {/* conversaitons  */}
          <Conversation conversations={conversations} />
          {/* input form for prescription */}
          <StoreInputPrescription
            onSave={createMessage}
            isLoading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsPage;
