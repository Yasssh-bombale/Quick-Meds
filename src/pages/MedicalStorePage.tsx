import { useGetAllStores } from "@/api/store-apis";
import PaginationSelector from "@/components/PaginationSelector";
import Stores from "@/components/Stores";
import { useState } from "react";

const MedicalStorePage = () => {
  const [page, setPage] = useState<number>(1);

  const { allStores, isLoading } = useGetAllStores(page);

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
      {/* pagination selector */}
      <PaginationSelector
        page={allStores?.pagination.page!}
        pages={allStores?.pagination.pages!}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MedicalStorePage;
