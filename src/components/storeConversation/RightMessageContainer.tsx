import { useFetchStoreConversations } from "@/api/conversationApi";
import NotFound from "../NotFound";
import { UserNameAndDp_Type } from "@/pages/OwnerConversation";
import Conversation from "../Conversation";

type Props = {
  userId: string;
  clickedUserId: string;
  clickedUserNameAndDp: UserNameAndDp_Type;
};

const RightMessageContainer = ({
  userId,
  clickedUserId,
  clickedUserNameAndDp,
}: Props) => {
  if (!clickedUserId) {
    return <NotFound message="u not click" height="h-fit" />;
  }

  const { conversations: userAllMessages } = useFetchStoreConversations(
    userId,
    clickedUserId
  );

  return (
    <div className="flex flex-col w-full">
      {/* main border zinc */}
      <div className="w-full border border-zinc-300 ml-1  rounded-md flex flex-col flex-1 px-3">
        {/* storeName */}
        <div className="flex items-center gap-2 border-b border-zinc-300 px-2">
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
        <Conversation conversations={userAllMessages!} />
        {/* input form for prescription */}
        {/* <StoreInputPrescription
    onSave={createMessage}
    isLoading={loading}
    setLoading={setLoading}
  /> */}
      </div>
    </div>
  );
};

export default RightMessageContainer;
