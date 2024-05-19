import { Card, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import {
  CircleDashed,
  PackageCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  orders: Order[];
  userId: string;
  storeOwner?: boolean;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Orders = ({
  orders: backendOrders,
  userId,
  storeOwner = false,
}: Props) => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    if (backendOrders?.length !== 0) {
      setOrders(backendOrders);
    }
  }, [backendOrders]);

  const placeOrderHandler = async (orderId: string) => {
    const params = new URLSearchParams();
    params.set("userId", userId);
    params.set("orderId", orderId);

    try {
      const resposne = await fetch(
        `${API_BASE_URL}/api/order/place?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!resposne.ok) {
        toast.error("Unable place order");
      }

      toast.success("Order placed");
      setOrders((prev) => {
        return prev?.map((order) =>
          order._id === orderId ? { ...order, isOrderPlaced: true } : order
        );
      });
    } catch (error) {
      console.log(`ERROR:IN PLACE-ORDER-HANDLER,${error}`);
    }
  };
  const outofstockHandler = async (orderId: string) => {
    const params = new URLSearchParams();
    params.set("userId", userId);
    params.set("orderId", orderId);

    try {
      const resposne = await fetch(
        `${API_BASE_URL}/api/order/outofstock?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!resposne.ok) {
        toast.error("Unable to proceed with your request");
      }

      toast.success("maked order to be outofstock!");
      setOrders((prev) => {
        return prev?.map((order) =>
          order._id === orderId ? { ...order, isOrderOutOffStock: true } : order
        );
      });
    } catch (error) {
      console.log(`ERROR:IN ORDER-OUT-STOCK-HANDLER,${error}`);
    }
  };

  return orders?.map((order) => (
    <div
      key={order._id}
      className="w-[330px] md:w-[1200px]  flex p-2 overflow-auto scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-purple-500 md:overflow-hidden"
    >
      <Card className="p-2 flex gap-x-4 w-fit justify-between">
        {/* prescription Image */}
        <img
          src={order.prescriptionImage}
          alt="storePng"
          className="w-40  md:w-40  rounded-md object-cover cursor-pointer border"
          onClick={() => window.open(order.prescriptionImage)}
        />
        {/* prescription */}
        <div className="rounded-md p-2">
          <CardDescription className="w-[300px] md:w-fit">
            <span className="font-semibold">Prescription</span>:{" "}
            {order.prescription} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum ducimus quo eligendi libero, iste eius magni
            delectus at neque, maiores, doloribus atque dolorem repudiandae
            inventore? Adipisci iure voluptatem repudiandae nihil?
          </CardDescription>
        </div>

        {/* orderDetails */}
        <div className="flex flex-col gap-y-1 w-96 p-1">
          {/* orderedBy */}
          <div className="flex items-center gap-x-1 text-sm overflow-hidden">
            <span className="text-nowrap">Ordered by : </span>
            <img
              src={order.userProfile}
              alt="user"
              className="w-5 h-5  object-cover rounded-full"
            />
            <span className="text-[14px]">{order.orderedBy}</span>
          </div>

          {/* mobileNumber */}
          <div className="flex items-center gap-x-2 text-sm">
            Contact number: +91 {order.customerMobileNumber}
          </div>

          {/* city state */}
          <div className="flex items-center gap-x-2 text-sm">
            City: {order.deliveryCity} , State: {order.deliveryState}
          </div>
          {/* deliver to */}
          <div className="flex items-center gap-x-2 text-sm w-60">
            Delivery address : {order.deliveryAddress} Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Nobis, delectus. Similique id ut
            ipsa deserunt, eligendi ducimus, nostrum facere temporibus porro vel
            molestiae eos aperiam expedita? Eum nesciunt aperiam porro.
          </div>
        </div>

        {/* order place button and out-off-stock button */}
        {storeOwner ? (
          <div className="flex flex-col space-y-2 mt-4">
            {order.isOrderPlaced ? (
              <Button
                className={`${
                  order.isOrderOutOffStock
                    ? "hidden"
                    : "flex text-[17px] px-5 md:px-12 bg-transparent hover:bg-transparent text-green-700 cursor-not-allowed"
                }`}
              >
                <PackageCheck className="mr-2" /> Order placed
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => placeOrderHandler(order._id)}
                  className={`${
                    order.isOrderOutOffStock
                      ? "hidden"
                      : "flex bg-green-600 text-[17px] hover:bg-green-600/85 px-5 md:px-12"
                  }`}
                >
                  <Truck className="mr-2" /> Place Order
                </Button>

                {order.isOrderOutOffStock ? (
                  <Button className="bg-transparent hover:bg-transparent cursor-not-allowed text-red-500 text-lg  px-5 md:px-12">
                    <ShoppingCart className="mr-2" /> Order out stock
                  </Button>
                ) : (
                  <Button
                    onClick={() => outofstockHandler(order._id)}
                    variant={"destructive"}
                  >
                    <X className="mr-2" />
                    Out of stock
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-2  items-center">
            <span className="font-semibold text-sm  mb-1 border-b-2 border-b-[#9E3FFD]">
              Order status
            </span>
            {order.isOrderOutOffStock || order.isOrderPlaced ? (
              <Button
                className={`bg-transparent hover:bg-transparent cursor-text ${
                  order.isOrderOutOffStock
                    ? "text-red-500 text-wrap text-[15px]"
                    : "text-green-700  text-[15px]"
                }`}
              >
                {order.isOrderPlaced && <PackageCheck className="mr-1" />}
                {order.isOrderOutOffStock ? "Not available" : "Order placed"}
              </Button>
            ) : (
              <Button className="cursor-text bg-transparent hover:bg-transparent text-black text-sm md:text-[16px]">
                <CircleDashed className="mr-1 animate-spin h-4 w-4" /> Pending
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  ));
};

export default Orders;
