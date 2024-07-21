import { Conversations } from "@/pages/StoreDetailsPage";
import { Button } from "./ui/button";

type Props = {
  conversation: Conversations;
  owner?: boolean;
};
const PrescriptionCard = ({ conversation, owner = false }: Props) => {
  // className={`flex flex-col gap-y-2  ${
  //   conversation.role === "owner" ? "items-start" : "items-end"
  // }  rounded-md border border-red-300`}
  return (
    <div
      className={`flex flex-col gap-y-2  ${
        owner
          ? `${conversation.role === "owner" ? "items-end" : "items-start"} `
          : `${conversation.role === "owner" ? "items-start" : "items-end"} `
      } rounded-md border border-red-300`}
    >
      {conversation.prescriptionImage && (
        <img
          onClick={() => window.open(conversation.prescriptionImage)}
          src={conversation.prescriptionImage}
          alt="image"
          className="w-40 h-52 md:w-52 md:h-80 object-cover border rounded-md cursor-pointer border-zinc-300"
        />
      )}
      {/*   className={`bg-zinc-500/10 p-2 w-fit  rounded-lg px-3 ${
            conversation.role === "owner" ? "self-start" : "self-end"
          }`} */}
      <div className={`max-w-96 w-full  flex flex-col items-end`}>
        <h2
          className={`bg-zinc-500/10 p-2 w-fit  rounded-lg px-3 ${
            owner
              ? `${conversation.role === "owner" ? "self-end" : "self-start"}`
              : `${conversation.role === "owner" ? "self-start" : "self-end"}`
          }`}
        >
          {conversation.message}
        </h2>
        {conversation.type === "order" && (
          <div className="border w-full flex-col mt-2">
            <div className="border w-full flex gap-2 items-center">
              <Button className="bg-[#246AD9] hover:bg-[#246AD9] hover:opacity-90 flex-1 text-sm">
                Pay ₹ {conversation.amount}
              </Button>
              <span>OR</span>
              <Button className="flex-1 border border-zinc-900 bg-transparent text-black hover:bg-transparent hover:text-black hover:bg-slate-100">
                Cash on delivery
              </Button>
            </div>
            {/* description text */}
            <p className="font-extralight text-center w-full border mt-1">
              order will be deliver within 24 hours{" "}
              <img
                src="/truck.svg"
                alt="truck"
                className="ml-1 border w-6 h-6 inline -mt-1"
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionCard;
