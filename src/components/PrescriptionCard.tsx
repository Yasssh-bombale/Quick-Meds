import { Order } from "@/types";

type Props = {
  order: Order;
};
const PrescriptionCard = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-y-2 items-end  rounded-md">
      <img
        src={order.prescriptionImage}
        alt="image"
        className="w-40 h-52 md:w-52 md:h-80 object-cover rounded-md cursor-pointer border"
      />
      <div className="max-w-96 w-full  flex justify-end">
        <h2 className="bg-zinc-500/10 p-2 w-fit  rounded-lg px-3">
          {order.prescription} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error commodi earum, omnis velit, corrupti deleniti
          facere ipsa ullam accusamus in assumenda fuga voluptate dicta, est
          cupiditate ex voluptatibus asperiores amet.
        </h2>
      </div>
    </div>
  );
};

export default PrescriptionCard;
