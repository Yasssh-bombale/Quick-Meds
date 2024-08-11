import { useGetAllStores } from "@/api/store-apis";
import NotFound from "@/components/NotFound";
import PaginationSelector from "@/components/PaginationSelector";
import Stores from "@/components/Stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
const MedicalStorePage = () => {
  const [page, setPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { allStores, isLoading, refetch } = useGetAllStores(page, searchQuery);
  const storeCount = allStores?.data.length;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // if (allStores?.data.length === 0) {
  //   return <span>No stores found</span>;
  // }

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex flex-col items-center gap-y-4 overflow-hidden">
      <div className="text-center p-2 flex relative  items-center  rounded-lg ">
        <form onSubmit={searchHandler} className="flex gap-2 relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by store name / address"
            className="w-72 outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD] "
          />
          {searchQuery.length !== 0 && (
            <RxCross2
              onClick={() => setSearchQuery("")}
              className="absolute left-64 top-2 h-6 cursor-pointer w-6"
            />
          )}
          <Button className="px-4" type="submit">
            Search
          </Button>
        </form>
      </div>

      {/* card for stores */}
      <Stores stores={allStores?.data!} />
      {/* pagination selector */}
      {storeCount === 0 && <NotFound message="No store found" notFound />}
      {storeCount && storeCount > 1 && (
        <PaginationSelector
          page={allStores?.pagination.page!}
          pages={allStores?.pagination.pages!}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MedicalStorePage;
