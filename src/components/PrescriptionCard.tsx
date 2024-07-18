import { Conversations } from "./OrderPrescription";
type Props = {
  conversation: Conversations;
  storeOwner?: boolean;
};
const PrescriptionCard = ({ conversation, storeOwner }: Props) => {
  return (
    <div
      className={`flex flex-col gap-y-2  ${
        storeOwner ? "items-start" : "items-end"
      }  rounded-md`}
    >
      <img
        onClick={() => window.open(order.prescriptionImage)}
        src={order.prescriptionImage}
        alt="image"
        className="w-40 h-52 md:w-52 md:h-80 object-cover rounded-md cursor-pointer border"
      />
      <div className="max-w-96 w-full  flex justify-end">
        <h2 className="bg-zinc-500/10 p-2 w-fit  rounded-lg px-3">
          {order.prescription}
        </h2>
      </div>
    </div>
  );
};

export default PrescriptionCard;
