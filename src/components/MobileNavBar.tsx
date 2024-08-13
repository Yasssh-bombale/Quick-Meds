import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const MobileNavBar = () => {
  const { user } = useAppSelector((state: RootState) => state.userState);
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div
              className={`bg-[#9E3FFD] mt-5  rounded-lg cursor-pointer text-center`}
            >
              <Link to={"/"}>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Quick meds
                </h1>
              </Link>
            </div>
          </SheetTitle>
          <div className="flex flex-col items-center">
            <Navbar user={user} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
