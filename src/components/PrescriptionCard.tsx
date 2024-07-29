import { Conversations } from "@/pages/StoreDetailsPage";
import { Button } from "./ui/button";
import { CheckCheck, Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import UpdateUserForm from "@/forms/user-forms/UpdateUserForm";
import { useGetMyUpdatedUser, useUpdateMyUser } from "@/api/user-apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import animationData from "@/data/cart_confirmed.json";
import Lottie from "react-lottie";
import truckAnimationData from "@/data/truck_order.json";
import checkSuccess from "@/data/checkanimation.json";
import confettiAnimationData from "@/data/confetti.json";

type Props = {
  conversation: Conversations;
  owner?: boolean;
};

const PrescriptionCard = ({ conversation, owner = false }: Props) => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );
  const { id: storeId } = useParams();
  const [paymentMode, setPaymentMode] = useState<string>("");
  const { user } = useGetMyUpdatedUser(userId); //getting currentUser information;
  const [cashSuccess, setCashSuccess] = useState<boolean>(false);
  const { updateUser, isLoading: updateLoading } = useUpdateMyUser(
    userId,
    paymentMode,
    conversation._id,
    storeId!,
    setCashSuccess
    // setIsCashClicked
  );

  useEffect(() => {
    if (cashSuccess) {
      setTimeout(() => {
        setCashSuccess(false);
      }, 20000); //12 seconds
    }
  }, [cashSuccess]);

  return (
    <div
      className={`flex flex-col gap-y-2  ${
        owner
          ? `${conversation.role === "owner" ? "items-end" : "items-start"} `
          : `${conversation.role === "owner" ? "items-start" : "items-end"} `
      } rounded-md border border-red-300`}
    >
      {conversation.prescriptionImage && (
        <img
          onClick={() => window.open(conversation.prescriptionImage)}
          src={conversation.prescriptionImage}
          alt="image"
          className="w-40 h-52 md:w-52 md:h-80 object-cover border rounded-md cursor-pointer border-zinc-300"
        />
      )}

      <div className={`max-w-96 w-full  flex flex-col items-end`}>
        <h2
          className={`bg-zinc-500/10 p-2 w-fit  rounded-lg px-3 ${
            owner
              ? `${conversation.role === "owner" ? "self-end" : "self-start"}`
              : `${conversation.role === "owner" ? "self-start" : "self-end"}`
          }`}
        >
          {conversation.message}
        </h2>

        {/* if conversation is ordered */}
        {conversation.isOrdered ? (
          <div className="w-full p-1">
            {/* background */}
            {cashSuccess ? (
              <div className="w-[500px]  flex flex-col items-center relative border p-2 rounded-md overflow-hidden mb-5">
                <div>
                  <Lottie
                    isClickToPauseDisabled
                    style={{
                      // border: "1px solid black",
                      position: "absolute",
                      left: "0",
                    }}
                    options={{
                      loop: false,
                      autoplay: true,
                      animationData: confettiAnimationData,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
                <div className="-ml-10">
                  <Lottie
                    isClickToPauseDisabled
                    height={120}
                    width={200}
                    // style={{ border: "1px solid black" }}
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: checkSuccess,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
                <div className="-ml-10">
                  <Lottie
                    isClickToPauseDisabled
                    height={100}
                    width={400}
                    // style={{ border: "1px solid black" }}
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: truckAnimationData,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full bg-gradient-to-r from-[#A5E3C4] to-[#5FEE83] rounded-sm p-1 mb-5">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
                <h1 className="text-xl text-center font-semibold">
                  {owner ? "Order confirmed" : "Your order is on the way!"}
                </h1>
                <p className="text-center text-sm hover:underline cursor-pointer mb-3">
                  check order
                </p>
              </div>
            )}

            {/* <div className="w-full bg-gradient-to-r from-[#A5E3C4] to-[#5FEE83] rounded-sm p-1">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
              />
              <h1 className="text-xl text-center font-semibold">
                {owner ? "Order confirmed" : "Your order is on the way!"}
              </h1>
              <p className="text-center text-sm hover:underline cursor-pointer">
                check order
              </p>
            </div> */}
          </div>
        ) : (
          <>
            {conversation.type === "order" && (
              <div className="border w-full flex-col mt-2">
                {owner &&
                  (conversation.isOrdered ? (
                    <Button className="w-full cursor-text bg-gradient-to-r from-green-500 to-black-500">
                      {conversation.paymentMode === "cash" ? (
                        <span className="flex">
                          Cash on delivery <CheckCheck className="ml-2" />
                        </span>
                      ) : (
                        <span className="flex">
                          Amount {conversation.amount}₹ Paid
                          <CheckCheck className="ml-2" />
                        </span>
                      )}
                    </Button>
                  ) : (
                    <Button className="flex w-full items-center capitalize cursor-text">
                      status pending <Ellipsis className="ml-2 -mb-1" />
                    </Button>
                  ))}

                {!owner && (
                  <>
                    {/* test dialogue */}
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
                              Order will be deliver based on details ,fill it
                              carefully
                            </DialogDescription>

                            <UpdateUserForm
                              className="p-2"
                              updatedUser={user!}
                              onSave={updateUser}
                              isLoading={updateLoading}
                            />
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    {/* custom dialogue */}
                    {/* <PrescriptionDialogue
                      cashSuccess={cashSuccess}
                      setPaymentMode={setPaymentMode}
                      conversation={conversation}
                      updateUser={updateUser}
                      isUpdateLoading={updateLoading}
                      updatedUser={user!}
                    /> */}

                    <p className="font-extralight text-center w-full border mt-1">
                      order will be deliver within 24 hours{" "}
                      <img
                        src="/truck.svg"
                        alt="truck"
                        className="ml-1 border w-6 h-6 inline -mt-1"
                      />
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PrescriptionCard;
