import Logo from "@/components/Logo";
import med from "../img/meditation.jpg";
import TypeEffect from "@/components/TypeEffect";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row gap-x-4">
      <img src={med} alt="hey.jpg" className="h-60 w-60 lg:h-auto lg:w-auto" />
      {/* slo guns */}
      <div className="mt-10 flex flex-col">
        <div className="flex items-center gap-x-4">
          <h1 className="text-xl md:text-2xl lg:text-4xl">
            From Prescription to Your Doorstep
          </h1>
          <Logo />
        </div>
        <TypeEffect />
      </div>
    </div>
  );
};

export default HomePage;
