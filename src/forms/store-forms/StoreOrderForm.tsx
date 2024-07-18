import { useGetStoreDetails } from "@/api/store-apis";
import { useParams } from "react-router-dom";
import StoreInfo from "./StoreInfo";
import StoreInputPrescription from "@/components/StoreInputPrescription";
import { useCreateOrder, useGetMyOrdersForStore } from "@/api/order-apis";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { setOrders } from "@/feature/slices/order.slice";

const StoreOrderForm = () => {
  const { id: storeId } = useParams();
  if (!storeId) {
    return;
  }

  // redux
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  // -----------------------
  const { store } = useGetStoreDetails(storeId);
  const { createOrder, isLoading } = useCreateOrder(storeId, userId);
  const { orders } = useGetMyOrdersForStore(userId, storeId);
  const dispatch = useAppDispatch();
  dispatch(setOrders(orders!));

  return (
    <div className="border-2 border-[#9E3FFD] rounded-md p-2  overflow-hidden">
      {/* upper part image,name, city,address */}
      {/* order prescription in the storeInfo component */}
      <StoreInfo store={store!} />

      <StoreInputPrescription onSave={createOrder} isLoading={isLoading} />
    </div>
  );
};

export default StoreOrderForm;
