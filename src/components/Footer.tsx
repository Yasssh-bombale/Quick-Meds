import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-10 border-t border-[#9E3FFD]">
      <div className="container  mx-auto flex flex-col gap-5 md:flex-row justify-between items-center">
        <div className={`bg-[#9E3FFD] px-2 py-1 rounded-lg cursor-pointer`}>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Quick meds
            </h1>
          </Link>
        </div>
        <div className="flex gap-4 font-bold tracking-tight">
          <span>Privacy Policy</span>
          <span>Terms &amp; service</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
