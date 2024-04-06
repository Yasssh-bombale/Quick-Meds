import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center border-b border-[#9E3FFD] justify-between p-2">
      <div className={`bg-[#9E3FFD] px-2 py-1 rounded-lg cursor-pointer`}>
        <Link to={"/"}>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Quick meds
          </h1>
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-x-5">
        <Link to={"/"} className="cursor-pointer">
          <Button
            variant={"ghost"}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Home
          </Button>
        </Link>
        <Link to={"/about"} className="cursor-pointer">
          <Button
            variant={"ghost"}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            About
          </Button>
        </Link>
        <Link to={"/services"} className="cursor-pointer">
          <Button
            variant={"ghost"}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Services
          </Button>
        </Link>
        <Link to={"/stores"} className="cursor-pointer">
          <Button
            variant={"ghost"}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Medicle stores
          </Button>
        </Link>
      </div>
      <Link to={"/signin"} className="hidden md:block">
        <Button
          variant={"outline"}
          className="text-[17px]  tracking-tight border border-[#9E3FFD]"
        >
          SignIn
        </Button>
      </Link>
    </div>
  );
};

export default Header;
