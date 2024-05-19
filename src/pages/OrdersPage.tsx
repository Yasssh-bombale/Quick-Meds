import { useGetOrdersFromAllStores } from "@/api/order-apis";
import Orders from "@/components/Orders";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const OrdersPage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { data } = useGetOrdersFromAllStores(userId);

  return (
    <div className="flex flex-col items-center gap-y-2 md:gap-y-4 overflow-hidden  p-2 min-h-screen">
      <Orders orders={data} userId={userId} />;
    </div>
  );
};

export default OrdersPage;
