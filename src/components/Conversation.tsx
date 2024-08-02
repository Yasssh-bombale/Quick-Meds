import { useEffect, useRef } from "react";
import PrescriptionCard from "./PrescriptionCard";
import { Conversations } from "@/pages/StoreDetailsPage";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/Conversation.context";

type Props = {
  conversations: Conversations[];
  height: string;
  owner?: boolean;
};

const Conversation = ({ conversations = [], height, owner = false }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousConversationsLengthRef = useRef(conversations.length);

  const { setCashSuccess } = useAppContext();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const conversationId = params.get("c");

  useEffect(() => {
    const previousConversationsLength = previousConversationsLengthRef.current;
    if (conversations.length > previousConversationsLength) {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }

    previousConversationsLengthRef.current = conversations.length;
  }, [conversations]);

  useEffect(() => {
    const container = containerRef.current;
    if (conversationId && container) {
      const element = document.getElementById(conversationId);
      if (element) {
        setCashSuccess(true);
        element.scrollIntoView({ behavior: "instant" });
        window.scrollTo(0, 0);
        const offset = 260; // Adjust this value to scroll more below the element
        container.scrollTop += offset;
      }
    }
  }, [conversationId, conversations]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Scroll to the bottom on initial mount
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount
  return (
    <div
      ref={containerRef}
      className={`border border-red-400 rounded-md ${height} flex flex-col  p-2 overflow-y-auto scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-purple-500 mb-2`}
    >
      {/* prescription image */}

      <div className="flex flex-col gap-y-2  border border-green-400 h-fit">
        {/* one */}
        {conversations?.length === 0 ? (
          <NotFound
            className="border border-blue-500"
            height="h-fit"
            message="Connect directly with store owners by"
          />
        ) : (
          conversations?.map((conversation, index) => (
            <div id={conversation._id} key={index}>
              <PrescriptionCard owner={owner} conversation={conversation} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Conversation;
