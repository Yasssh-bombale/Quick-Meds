import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className={`bg-[#9E3FFD] px-2 py-1 rounded-lg cursor-pointer w-fit`}>
      <Link to={"/"}>
        <h1 className="lg:text-2xl text-xl font-bold tracking-tight text-white text-nowrap">
          Quick meds
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
