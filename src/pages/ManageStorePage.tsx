import { useGetOrdersForOwners } from "@/api/order-apis";
import BackButton from "@/components/BackButton";
import MySeperator from "@/components/MySeperator";
import NoOrders from "@/components/NoOrders";
import Orders from "@/components/Orders";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Store } from "@/types";

export type HasStoreType = {
  userHasStore: boolean;
  store: Store;
};

const ManageStorePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  ); //getting current userId for getting his store details;

  const { data } = useGetOrdersForOwners(userId); //pass here isOrderPlaced boolean;

  // useEffect(() => {
  //   dispatch(makePlaceOrder(false));
  // }, [isOrderPlaced]);

  return (
    <div className="flex flex-col items-center gap-y-2 md:gap-y-4 overflow-hidden  p-2 min-h-screen">
      <div className="flex items-center gap-x-1 md:gap-x-9 overflow-hidden">
        <BackButton className="md:mt-[-100px] " />
        <img
          src={data?.storeDetails.storeImage}
          alt="https://ideogram.ai/api/images/direct/0lLf097zQPWvmMa5YyHkSg.png"
          className="w-20 h-20 md:w-36 md:h-36 border object-cover rounded-md"
        />
        <h1 className="text-2xl md:text-5xl font-semibold tracking-tight  w-[200px] md:w-[600px] truncate">
          {data?.storeDetails.storeName}
        </h1>
      </div>
      <MySeperator />
      <p>Your store currently has : {data?.totalOrders} orders</p>
      {data?.totalOrders === 0 ? (
        <NoOrders />
      ) : (
        <>
          {/* {data?.orders.map((order) => (
            <Orders key={order._id} order={order} userId={userId} />
          ))} */}
          <Orders orders={data?.orders!} userId={userId} storeOwner />
        </>
      )}

      {/* pagination selector */}
      {/* <PaginationSelector
        page={allStores?.pagination.page!}
        pages={allStores?.pagination.pages!}
        onPageChange={setPage}
      /> */}
    </div>
  );
};

export default ManageStorePage;
