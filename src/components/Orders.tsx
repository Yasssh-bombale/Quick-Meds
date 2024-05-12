import { Card, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Truck, X } from "lucide-react";
import { Order } from "@/types";

type Props = {
  order: Order;
};

const Orders = ({ order }: Props) => {
  // const navigate = useNavigate();
  // const cardClickHandler = (id: string) => {
  //   navigate({
  //     pathname: `/medicalstores/${id}`,
  //   });
  // };

  return (
    <div className="border border-green-500 w-[330px] md:w-[1200px]  flex p-2 overflow-auto scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-purple-500 md:overflow-hidden">
      <Card className="p-2 flex gap-x-4 w-full justify-between">
        {/* prescription Image */}
        <img
          src={order.prescriptionImage}
          alt="storePng"
          className="w-40  md:w-40  rounded-md object-cover cursor-pointer border"
          onClick={() => window.open(order.prescriptionImage)}
        />
        {/* prescription */}
        <div className="border rounded-md p-2 border-blue-500">
          <CardDescription className="border-2 border-yellow-500 w-[300px] md:w-fit">
            <span className="font-semibold">Prescription</span>:{" "}
            {order.prescription} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum ducimus quo eligendi libero, iste eius magni
            delectus at neque, maiores, doloribus atque dolorem repudiandae
            inventore? Adipisci iure voluptatem repudiandae nihil?
          </CardDescription>
        </div>

        {/* orderDetails */}
        <div className="flex flex-col gap-y-1 w-96 border border-red-500 p-1">
          {/* orderedBy */}
          <div className="flex border items-center gap-x-1 text-sm overflow-hidden">
            <span className="text-nowrap">Ordered by : </span>
            <img
              src={order.userProfile}
              alt="user"
              className="w-5 h-5 border object-cover rounded-full"
            />
            <span className="text-[14px]">{order.orderedBy}</span>
          </div>

          {/* mobileNumber */}
          <div className="flex border items-center gap-x-2 text-sm">
            Contact number: +91 {order.customerMobileNumber}
          </div>

          {/* city state */}
          <div className="flex border items-center gap-x-2 text-sm">
            City: {order.deliveryCity} , State: {order.deliveryState}
          </div>
          {/* deliver to */}
          <div className="flex border items-center gap-x-2 text-sm w-60">
            Delivery address : {order.deliveryAddress} Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Nobis, delectus. Similique id ut
            ipsa deserunt, eligendi ducimus, nostrum facere temporibus porro vel
            molestiae eos aperiam expedita? Eum nesciunt aperiam porro.
          </div>
        </div>

        {/* order place button and out-off-stock button */}
        <div className="flex flex-col space-y-2 mt-4 border">
          <Button className="bg-green-600 text-[17px] hover:bg-green-600/85 px-5 md:px-12">
            <Truck className="mr-2" /> Place Order
          </Button>
          <Button variant={"destructive"}>
            <X className="mr-2" />
            Out of stock
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Orders;
