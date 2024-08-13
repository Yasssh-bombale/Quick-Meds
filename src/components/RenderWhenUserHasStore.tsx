import { useCheckUserHasStore } from "@/api/store-apis";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const RenderWhenUserHasStore = ({ userId }: { userId: string }) => {
  const { check } = useCheckUserHasStore(userId);

  return (
    <>
      {check?.userHasStore && check.store.status === "approved" && (
        <div className="flex flex-col">
          <div className="font-semibold tracking-tight text-lg cursor-pointer p-2">
            <Link to={"/manage-store"}>Manage Store</Link>
          </div>
          <div className="font-semibold tracking-tight text-lg cursor-pointer p-2">
            <Link to={"/conversations"}>Conversations</Link>
          </div>
        </div>
      )}
      <div className="font-bold tracking-tight text-sm cursor-pointer p-2">
        <Button variant={"ghost"} className="font-semibold text-lg">
          <Link to={"/create-store"}>
            {check?.store ? "Check store approval status" : "Create store"}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default RenderWhenUserHasStore;
