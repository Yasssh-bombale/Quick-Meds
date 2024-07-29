import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import UpdateUserForm, {
  updateUserFormData,
} from "@/forms/user-forms/UpdateUserForm";
import { Conversations } from "@/pages/StoreDetailsPage";
import truckAnimationData from "@/data/truck_order.json";
import checkSuccess from "@/data/checkanimation.json";
import { UpdatedUser } from "@/types";
type Props = {
  cashSuccess: boolean;
  conversation: Conversations;
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>;
  updateUser: (formData: updateUserFormData) => void;
  isUpdateLoading: boolean;
  updatedUser: UpdatedUser;
};
const PrescriptionDialogue = ({
  cashSuccess,
  setPaymentMode,
  conversation,
  updateUser,
  isUpdateLoading,
  updatedUser,
}: Props) => {
  return (
    <Dialog>
      <div className="border w-full flex gap-2 items-center">
        <DialogTrigger className="flex-1">
          <Button
            onClick={() => setPaymentMode("online")}
            className="bg-[#246AD9] hover:bg-[#246AD9] hover:opacity-90 text-sm w-full"
          >
            Pay ₹ {conversation.amount}
          </Button>
        </DialogTrigger>
        <span>OR</span>
        <DialogTrigger className="flex-1">
          <Button
            onClick={() => setPaymentMode("cash")}
            className="w-full border border-zinc-900 bg-transparent text-black hover:bg-transparent hover:text-black hover:bg-slate-100"
          >
            Cash on delivery
          </Button>
        </DialogTrigger>
      </div>
      {/* user Profile dialog content */}
      <DialogContent>
        {cashSuccess ? (
          <>
            <Lottie
              height={120}
              width={200}
              // style={{ border: "1px solid black" }}
              options={{
                loop: false,
                autoplay: true,
                animationData: checkSuccess,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
            <Lottie
              height={100}
              width={400}
              // style={{ border: "1px solid black" }}
              options={{
                loop: false,
                autoplay: true,
                animationData: truckAnimationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          </>
        ) : (
          <>
            <DialogHeader className="items-center text-2xl font-semibold capitalize">
              Check delivery details
            </DialogHeader>
            <DialogDescription className="text-center">
              Order will be deliver based on details ,fill it carefully
            </DialogDescription>

            <UpdateUserForm
              className="p-2"
              updatedUser={updatedUser!}
              onSave={updateUser}
              isLoading={isUpdateLoading}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialogue;
