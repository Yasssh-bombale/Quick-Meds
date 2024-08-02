import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RAZORPAY_API_ID = import.meta.env.VITE_RAZORPAY_API_ID;
const PaymentTest = () => {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState("");

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
        handler: (response: any) => {
          setResponseId(response.razorpay_payment_id);
        },
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

  return (
    <div>
      <button onClick={() => createRazorpayOrder(10)}>pay 10 ruppes</button>
    </div>
  );
};

export default PaymentTest;
