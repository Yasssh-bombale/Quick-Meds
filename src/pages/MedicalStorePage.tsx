import { useGetAllStores } from "@/api/store-apis";
import Stores from "@/components/Stores";

const MedicalStorePage = () => {
  const { allStores, isLoading } = useGetAllStores();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (allStores?.data.length === 0) {
    return <span>No stores found</span>;
  }

  return (
    <div className="border flex flex-col items-center gap-y-4 overflow-hidden">
      <div className="text-center p-2 w-fit border border-[#9E3FFD] rounded-lg ">
        <h1 className="text-xl md:text-4xl">
          Total Registered stores are : {allStores?.pagination.total}
        </h1>
      </div>

      {/* card for stores */}
      <Stores stores={allStores?.data!} />
    </div>
  );
};

export default MedicalStorePage;
