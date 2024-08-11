import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col px-4 py-2">
      {/* header */}
      <div className="flex justify-between mb-10">
        <Logo />
        <Button className="">
          <Link to={"/home"}>Get started</Link>
        </Button>
      </div>

      {/* snapshots */}
      <div className="flex flex-col  mt-10 gap-32">
        <div className="flex flex-col lg:flex-row gap-4 overflow-hidden items-center">
          <img
            src="/owners verification.png"
            alt="order"
            className="w-96 lg:w-2/3 shadow-lg rounded-lg"
            draggable={"false"}
          />
          <h1 className="text-2xl lg:text-3xl flex  gap-2">
            <img
              src="/verified.svg"
              alt="tick"
              className="h-8 w-8 lg:h-10 lg:w-10 object-cover mt-1"
              draggable={"false"}
            />
            Strict verified store owners along with license
          </h1>
        </div>
        {/* second */}
        <div className="flex flex-col lg:flex-row gap-4 overflow-hidden items-center mb-10 mx-4">
          <h1 className="text-2xl lg:text-3xl flex  gap-2">
            <img
              src="/verified.svg"
              alt="tick"
              className="h-8 w-8 lg:h-10 lg:w-10 object-cover mt-1"
              draggable={"false"}
            />
            Connect directly with stores and upload your prescription
          </h1>
          <video
            autoPlay
            loop
            muted
            src="/demo convo.mp4"
            className="w-96 lg:w-1/2 h-44 lg:h-[320px] shadow-lg border rounded-lg object-cover"
            draggable={"false"}
          />
        </div>
        {/* third users view */}
        <div className="flex flex-col lg:flex-row  gap-4 overflow-hidden items-center mb-10 mx-4">
          <video
            autoPlay
            loop
            muted
            src="/users view.mp4"
            className="w-96 lg:w-1/2 h-44 lg:h-[320px] shadow-lg border rounded-lg object-cover"
            draggable={"false"}
          />
          <h1 className="text-2xl lg:text-3xl flex  gap-2">
            <img
              src="/verified.svg"
              alt="tick"
              className="h-8 w-8 lg:h-10 lg:w-10  object-cover mt-1"
              draggable={"false"}
            />
            Once store owner responded , then you can make payment by your
            choice
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
