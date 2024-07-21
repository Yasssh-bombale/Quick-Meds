import { useEffect, useRef } from "react";
import PrescriptionCard from "./PrescriptionCard";
import { Conversations } from "@/pages/StoreDetailsPage";
import NotFound from "./NotFound";

type Props = {
  conversations: Conversations[];
  height: string;
  owner?: boolean;
};

const Conversation = ({ conversations, height, owner = false }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversations]);

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
          conversations?.map((conversation) => (
            <PrescriptionCard
              owner={owner}
              key={conversation._id}
              conversation={conversation}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Conversation;
