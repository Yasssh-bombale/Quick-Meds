import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.userState);

  return (
    <>
      <Link to={"/"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight"
        >
          Home
        </Button>
      </Link>
      <Link to={"/medicalstores"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight"
        >
          Medical store
        </Button>
      </Link>
      <Link to={"/services"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight"
        >
          Services
        </Button>
      </Link>
      <Link to={"/about"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight"
        >
          About
        </Button>
      </Link>

      {user ? (
        <img
          className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 p-1 border-purple-500"
          alt="user"
          src={user.profilePicture}
        />
      ) : (
        <Link to={"/signin"} className="w-full">
          <Button className="text-[17px] tracking-tight w-full">SignIn</Button>
        </Link>
      )}
    </>
  );
};

export default Navbar;
