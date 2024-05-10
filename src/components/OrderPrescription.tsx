import { Order } from "@/types";
import PrescriptionCard from "./PrescriptionCard";

type Props = {
  orders?: Order[];
};

const OrderPrescription = ({ orders }: Props) => {
  return (
    <div className="border rounded-md max-h-96 flex justify-end p-2 overflow-y-auto scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-purple-500 mb-2">
      {/* prescription image */}
      <div className="flex flex-col gap-y-2">
        {/* one */}
        {orders?.length !== 0 &&
          orders?.map((order) => (
            <PrescriptionCard key={order._id} order={order} />
          ))}
      </div>
    </div>
  );
};

export default OrderPrescription;
