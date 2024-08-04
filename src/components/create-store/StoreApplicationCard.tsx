import { Store } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ClockIcon, RocketIcon } from "lucide-react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }: { store: Store }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full flex border mt-2 overflow-hidden">
      <img
        src={store.imageUrl}
        alt="Store"
        className="w-96 bg-gray-200 rounded-md h-auto object-cover object-center"
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
                    to={"/medicalstores"}
                    className="font-semibold hover:underline"
                  >
                    explore page
                  </Link>
                  . Head to the{" "}
                  <Link
                    to={"/conversation"}
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
