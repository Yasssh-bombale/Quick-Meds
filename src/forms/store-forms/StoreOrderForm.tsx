import { useGetStoreDetails } from "@/api/store-apis";

import { useParams } from "react-router-dom";
import StoreInfo from "./StoreInfo";
import StoreInputPrescription from "@/components/StoreInputPrescription";
import { useCreateOrder } from "@/api/order-apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const StoreOrderForm = () => {
  const { id: storeId } = useParams();
  if (!storeId) {
    return;
  }

  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { store } = useGetStoreDetails(storeId);
  const { createOrder } = useCreateOrder(storeId, userId);

  return (
    <div className="border-2 border-[#9E3FFD] rounded-md md:p-3 overflow-hidden">
      {/* upper part image,name, city,address */}
      <StoreInfo store={store!} />

      <StoreInputPrescription onSave={createOrder} />
    </div>
  );
};

export default StoreOrderForm;
