import { useFetchStoreConversations } from "@/api/conversationApi";
import NotFound from "@/components/NotFound";
import LeftUsers from "@/components/storeConversation/LeftUsers";
import RightMessageContainer from "@/components/storeConversation/RightMessageContainer";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useState } from "react";

export type UserNameAndDp_Type = {
  userName: string;
  userProfile: string;
};

const OwnerConversations = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );
  const [clickedUserId, setClickedUserId] = useState<string>("");
  const [clickedUserNameAndDp, setClickedUserAndDp] =
    useState<UserNameAndDp_Type>({
      userName: "",
      userProfile: "",
    });

  const { conversations } = useFetchStoreConversations(userId);

  if (!conversations || conversations.length === 0) {
    return (
      <NotFound message="It looks like your store does not have any messages yet" />
    );
  }

  // if (clickedUserId) {
  //   const { conversations } = useFetchStoreConversations(userId, clickedUserId);
  // }

  return (
    <div className="flex mt-[-20px] md:divide-x-2 md:divide-double  divide-purple-600 gap-2 border border-zinc-300 rounded-lg p-2 overflow-hidden">
      <div className="max-w-96 w-full  flex  flex-col border border-pink-300 p-2 rounded-md ">
        <h1 className="text-xl font-semibold self-center  mb-2">Messages</h1>
        <div className="border border-zinc-200 mb-2" />
        {/* storeMessages */}
        <ul className="flex flex-col border gap-2 h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500">
          {conversations.map((item) => (
            <LeftUsers
              key={item._id}
              profile={item.senderProfile}
              userName={item.senderName}
              message={item.message}
              userId={item.userId}
              setClickedUserId={setClickedUserId}
              setClickedUserAndDp={setClickedUserAndDp}
            />
          ))}
        </ul>
      </div>

      <RightMessageContainer
        userId={userId}
        clickedUserId={clickedUserId}
        clickedUserNameAndDp={clickedUserNameAndDp}
      />
    </div>
  );
};

export default OwnerConversations;
