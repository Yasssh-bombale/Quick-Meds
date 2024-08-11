import { Store } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, ClockIcon, RocketIcon } from "lucide-react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }: { store: Store }) => {
  let rejectionMessage;
  if (store.status === "rejected") {
    if (store.rejectionReasons) {
      rejectionMessage = store.rejectionReasons.map((reason) => {
        if (reason === "Owners photo is blur") {
          return "owner's identity could not be verified. Please ensure you provide a clear live picture of the store owner and resubmit your application.";
        } else if (reason === "License is blur") {
          return "the submitted license image is blurry and unreadable. For verification purposes, please ensure that the license image is clear and legible. Any further submissions with unclear documentation may result in a permanent ban from our platform. Please resubmit your application with a clear license image";
        } else if (reason === "Fake license") {
          return "Your application has been rejected due to the submission of a fake or invalid license. This is a serious violation of our policies. Any further attempts to submit fraudulent information will result in a permanent ban from our platform. Please ensure that all future submissions are accurate and truthful.";
        } else if (reason === "Expired license") {
          return "invalid or expired license. Please provide a valid license";
        } else if ((reason = "Owners photo not matches with license holder")) {
          return "the provided owner's photo does not match the license holder's photo. As per legal requirements, only the license holder can operate the medical store. Please ensure that the person creating the store is the same as the license holder and resubmit your application. Failure to comply with this requirement may result in further action, including a permanent ban from our platform.";
        } else if (reason === "Invalid data") {
          return "inaccurate information. Please review your application details and correct any errors before resubmitting.";
        }
      });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full flex flex-col lg:flex-row border mt-2 overflow-hidden  p-3 mx-auto">
      <img
        src={store.imageUrl}
        alt="Store"
        className={`h-52 xl:w-96 bg-gray-200 rounded-md xl:h-auto object-cover object-center`}
      />
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          Store Name: {store.storeName}
        </h2>
        <p className="mb-1">
          <strong>Owner Name:</strong> {store.ownerName}
        </p>
        <p className="mb-1">
          <strong>Address:</strong> {store.address}, {store.city}, {store.state}
        </p>
        <p className="mb-1">
          <strong>Mobile Number:</strong> +91 {store.mobileNumber}
        </p>
        <p className="mb-4">
          <strong>Approval Status:</strong>{" "}
          {store.status === "pending" && (
            <Alert className="flex items-center mt-2 border border-yellow-500">
              <ClockIcon className="h-5 w-5" />
              <div className="ml-1">
                <AlertTitle>Application Pending</AlertTitle>
                <AlertDescription>
                  Your store application is currently under{" "}
                  <span className="font-semibold">review</span>. We will notify
                  you once it has been approved.
                </AlertDescription>
              </div>
            </Alert>
          )}
          {store.status === "approved" && (
            <Alert className="border border-green-500 mt-2">
              <RocketIcon className="h-6 w-6" color="green" />
              <div className="ml-1">
                <AlertTitle className="">You're Approved!</AlertTitle>
                <AlertDescription>
                  Your store is live on the{" "}
                  <Link
                    to={"/explore"}
                    className="font-semibold hover:underline"
                  >
                    explore page
                  </Link>
                  . Head to the{" "}
                  <Link
                    to={"/conversations"}
                    className="font-semibold hover:underline"
                  >
                    conversation page
                  </Link>{" "}
                  to manage your orders.
                </AlertDescription>
              </div>
            </Alert>
          )}
          {/* rejection message */}
          {store.status === "rejected" && (
            <Alert className="border border-red-500 mt-2">
              <AlertTriangle className="h-6 w-6" color="red" />
              <div className="ml-1">
                <AlertTitle className="">Application Rejected</AlertTitle>
                <AlertDescription>
                  <h1 className="font-semibold mt-2">
                    Your store application has been rejected because
                  </h1>
                  <ul className="list-decimal mt-2">
                    {rejectionMessage?.map((message) => (
                      <li className="text-base font-light leading-normal">
                        {message}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </div>
            </Alert>
          )}
        </p>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
            <p className="mb-2 font-semibold text-lg">License</p>
            <img
              src={store.license}
              alt="License"
              className="w-full bg-gray-200  h-48 object-cover rounded-lg"
              draggable={"false"}
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="mb-2 font-semibold text-lg">Owner</p>
            <img
              src={store.ownerLivePicture}
              alt="Owner Live"
              className="w-full h-48 object-cover rounded-lg"
              draggable={"false"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
