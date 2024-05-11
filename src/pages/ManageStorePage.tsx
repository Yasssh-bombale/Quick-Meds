import { useGetOrdersForOwners } from "@/api/order-apis";
import BackButton from "@/components/BackButton";
import MySeperator from "@/components/MySeperator";
import NoOrders from "@/components/NoOrders";
import Orders from "@/components/Orders";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const ManageStorePage = () => {
  // const [page, setPage] = useState<number>(1);

  // const { allStores, isLoading } = useGetAllStores(page);

  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  ); //getting current userId for getting his store details;

  const { data } = useGetOrdersForOwners(userId);

  // if (!data?.orders) {
  //   return <NoOrders />;
  // }

  return (
    <div className="flex flex-col items-center gap-y-4 overflow-hidden  p-2 min-h-screen">
      <div className="border-2 flex items-center gap-x-3">
        <BackButton backTo="/" className="mt-[-100px]" />
        <img
          src={data?.storeDetails.storeImage}
          alt="https://ideogram.ai/api/images/direct/0lLf097zQPWvmMa5YyHkSg.png"
          className="w-36 h-36 border object-cover rounded-md"
        />
        <h1 className="text-5xl font-semibold tracking-tight border w-[600px] truncate">
          {data?.storeDetails.storeName} Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Rem, enim?
        </h1>
      </div>
      <MySeperator />
      <p>Your store currently has : {data?.totalOrders} orders</p>
      {data?.totalOrders === 0 ? (
        <NoOrders />
      ) : (
        <>
          {data?.orders.map((order) => (
            <Orders key={order._id} order={order} />
          ))}
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
