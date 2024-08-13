import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import UserDropdown from "./UserDropdown";
import { userObject } from "@/feature/slices/user.slice";
import RenderWhenUserHasStore from "./RenderWhenUserHasStore";

const Navbar = ({ user }: { user: userObject }) => {
  return (
    <>
      {user && (
        <div className="flex sm:hidden items-center gap-1">
          <img
            className="h-12 w-12 rounded-full object-cover cursor-pointer p-2"
            alt="user"
            src={user.profilePicture}
          />
          <p>{user.email}</p>
        </div>
      )}
      <Link to={"/home"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
        >
          Home
        </Button>
      </Link>

      <Link to={"/explore"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
        >
          Explore stores
        </Button>
      </Link>
      <div className="flex sm:hidden">
        {user && user.isAdmin ? (
          <div className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/applications"}>
              {" "}
              <Button
                variant={"ghost"}
                className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
              >
                Store applications
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
                <Link to={"/user-profile"}>Profile</Link>
              </DropdownMenuItem> */}
            {user && <RenderWhenUserHasStore userId={user._id} />}
          </div>
        )}
      </div>

      {user ? (
        <UserDropdown user={user} />
      ) : (
        <Link to={"/signin"} className="w-full">
          <Button className="text-[17px] tracking-tight w-full">SignIn</Button>
        </Link>
      )}
    </>
  );
};

export default Navbar;
