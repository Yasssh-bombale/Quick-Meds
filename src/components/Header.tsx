import { Link } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavBar from "./MobileNavBar";

const Header = () => {
  return (
    <div className="flex items-center border-b border-[#9E3FFD] justify-between">
      <div className={`bg-[#9E3FFD] px-2 py-1 rounded-lg cursor-pointer`}>
        <Link to={"/"}>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Quick meds
          </h1>
        </Link>
      </div>

      {/* Links */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      <div className="flex md:hidden">
        <MobileNavBar />
      </div>
    </div>
  );
};

export default Header;
