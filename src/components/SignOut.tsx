import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { signOutStart } from "@/feature/slices/user.slice";
import { toast } from "sonner";
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOutHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signout`
      );

      if (!response.ok) {
        return toast.error("Something went wrong!");
      }
      dispatch(signOutStart());
      navigate("/");
      toast.success("Signout successfully");
    } catch (error) {
      console.log("ERROR_IN_SIGNOUT_CLIENT", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <LoadingButton widthFull />
  ) : (
    <Button className="w-full" onClick={signOutHandler}>
      <LogOut className="mr-2" />
      Sign out
    </Button>
  );
};

export default SignOut;
