import { useNavigate, useParams } from "react-router-dom";
import creditCard from "@/data/credit-cardAnimation.json";
import Lottie from "react-lottie";
import { useGetCheckoutDetails } from "@/api/checkout.apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Logo from "@/components/Logo";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RAZORPAY_API_ID = import.meta.env.VITE_RAZORPAY_API_ID;

const CheckoutPage = () => {
  const { storeId, conversationId } = useParams();
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );
  const navigate = useNavigate();

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount: any) => {
    amount = amount * 100;
    fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((response) => {
        console.log(response);
        handleRazorpayScreen(amount);
      })
      .catch((error) => {
        console.log(`ERROR:IN CREATE_RAZORPAY_ORDER,${error}`);
      });
  };

  const handleRazorpayScreen = async (amount: any) => {
    try {
      const res = await loadScript(
        "https:/checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        throw new Error("Could not load razorpay screen");
      }

      const options = {
        key: RAZORPAY_API_ID,
        amount: amount,
        currency: "INR",
        name: "Quick-Meds",
        description: "payment to Quick Meds",
        handler: createOrderInServer,
        prefill: {
          name: "QuickMeds",
          email: "quickmeds@gmail.com",
        },
        theme: {
          color: "#F4C430",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(`ERROR:IN RAZORPAY_SCREEN:${error}`);
    }
  };

  //after payment handler;
  const createOrderInServer = async (response: any) => {
    const params = new URLSearchParams();
    params.set("conversationId", conversationId!);
    params.set("userId", userId);
    params.set("paymentId", response.razorpay_payment_id);
    try {
      const res = await fetch(`${API_BASE_URL}/payment?${params.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Could not create order in server");
      }

      navigate(`/medicalstores/${storeId}?c=${conversationId}`);
    } catch (error) {
      console.log(`ERROR:WHILE CREATING ORDER IN SERVER,${error}`);
    }
  };

  const { checkOutDetails } = useGetCheckoutDetails(conversationId!, userId);

  return (
    <div className="relative flex flex-col items-center">
      <img
        src="/circle.svg"
        alt="svg background"
        className="h-screen w-full absolute -z-10"
        draggable="false"
      />
      <Logo className="absolute left-2/4 top-6" />
      <div className="border border-zinc-300 rounded-md mt-20 flex max-w-4xl w-full p-1">
        <div className="border border-black">
          <Lottie
            isClickToPauseDisabled
            height={400}
            width={300}
            options={{
              loop: true,
              autoplay: true,
              animationData: creditCard,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </div>

        {/* right part */}
        {checkOutDetails &&
          checkOutDetails.conversation &&
          checkOutDetails.store && (
            <div className="h-[400px] w-full rounded-r-md overflow-hidden p-1">
              <h1 className="text-3xl font-semibold line-clamp-1">
                Make order from {checkOutDetails?.store.storeName}
              </h1>

              <div className="flex flex-col border p-1 mt-5">
                <img
                  src={checkOutDetails?.conversation.prescriptionImage}
                  alt="prescription"
                  className="h-52 w-full object-cover rounded-md"
                  draggable="false"
                />
                <p className="text-2xl text-center">
                  <span className="line-clamp-1 font-semibold">
                    {checkOutDetails?.conversation.message}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 mt-10">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"custom"}
                      className="w-full bg-red-500 text-lg text-white hover:opacity-90"
                    >
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to cancel order?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => navigate(`/medicalstores/${storeId}`)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* dialogue */}
                <Button
                  onClick={() =>
                    createRazorpayOrder(checkOutDetails.conversation.amount)
                  }
                  variant={"custom"}
                  className="w-full bg-sky-400 text-black text-lg hover:opacity-85"
                >
                  Pay {checkOutDetails.conversation.amount} ₹
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CheckoutPage;
