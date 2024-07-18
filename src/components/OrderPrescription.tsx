import { useEffect, useState } from "react";
import PrescriptionCard from "./PrescriptionCard";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useParams } from "react-router-dom";

// export type Conversations = {
//   _id: string;
//   storeId: string;
//   userId: string;
//   type?: "message" | "order";
//   role: "user" | "owner";
//   message: string;
//   prescriptionImage?: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type MessageType = {
//   role: string;
//   message: string;
// };

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderPrescription = () => {
  // const { user } = useAppSelector((state: RootState) => state.userState);
  // const { _id: userId } = user;
  // const { id: storeId } = useParams(); //getting id of store as storeId;

  // const [conversations, setConversations] = useState<Conversations[]>([]);

  // //create conversation;
  // const createMessage = async ({ role, message }: MessageType) => {
  //   try {
  //     const res = await fetch(
  //       `${API_BASE_URL}/api/conversation/create?userId=${userId}&storeId=${storeId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ role, message }),
  //       }
  //     );

  //     const data = await res.json();
  //     if (res.ok) {
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(`ERROR:WHILE CREATING MESSAGES:${error}`);
  //   }
  // };

  return (
    // <div className="border border-red-400 rounded-md max-h-96 flex flex-col  p-2 overflow-y-auto scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-purple-500 mb-2">
    //   {/* prescription image */}

    //   <div className="flex flex-col gap-y-2  border border-green-400 h-fit">
    //     {/* one */}
    //     {conversations?.length !== 0 &&
    //       conversations?.map((conversation) => (
    //         <PrescriptionCard
    //           key={conversation._id}
    //           conversation={conversation}
    //         />
    //       ))}
    //   </div>
    // </div>

    // test;
    <div>testing</div>
  );
};

export default OrderPrescription;
