import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  text: string;
};

const OAuth = ({ text }: Props) => {
  const navigate = useNavigate();

  const changeHandler = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // Allowing users if selecting popup window even if they have only one account

    try {
      //refering docs:- https://firebase.google.com/docs/auth/web/google-signin#web-modular-api_4
      const auth = getAuth(app);
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json(); //*** Note : await is required */

      if (res.ok) {
        toast.success(data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(`ERROR:While getting response GOOGLE OAUTH ${error}`);
    }
  };
  return (
    <Button
      onClick={changeHandler}
      variant={"outline"}
      type="button"
      className="w-full bg-white text-black text-[16px] flex items-center gap-2"
    >
      <FcGoogle className="w-6 h-6" />
      {text}
    </Button>
  );
};

export default OAuth;
