import { useAppSelector } from "@/hooks";
import Navbar from "./Navbar";
import { RootState } from "@/store/store";

const DesktopNavbar = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);

  return (
    <div className="flex items-center gap-x-5  mr-5 p-1">
      <Navbar user={user} />
    </div>
  );
};

export default DesktopNavbar;
