import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userObject } from "@/feature/slices/user.slice";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

type Props = {
  user: userObject;
};

const UserDropdown = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block" asChild>
        <img
          className="h-12 w-12 rounded-full object-cover cursor-pointer p-2"
          alt="user"
          src={user.profilePicture}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2">
        <DropdownMenuLabel className="text-sm font-medium">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/user-profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/create-store"}>Create store</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/conversations"}>Conversations</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/manage-store"}>Manage store</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
            <Link to={"/orders"}>Your orders</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* signOut button */}
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
