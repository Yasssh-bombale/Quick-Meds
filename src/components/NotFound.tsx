import { Link } from "react-router-dom";
import look from "../img/Look.jpg";
import { Button } from "./ui/button";
import ufo from "../../public/not_found_ufo.svg";
import Logo from "./Logo";

type Props = {
  message: string;
  buttonText?: string;
  linkTo?: string;
  className?: string;
  height?: string;
  notFound?: boolean;
};

const NotFound = ({
  message,
  buttonText,
  linkTo,
  className,
  height = "h-screen",
  notFound,
}: Props) => {
  return (
    <div className={`${height} mt-80 md:mt-0 ${className}`}>
      <div className="flex items-center gap-x-3 mt-20 justify-center">
        <img
          src={notFound ? ufo : look}
          alt="look"
          className="w-32 h-32 md:w-56 md:h-56 object-cover"
        />
        <div className="flex items-center justify-center flex-col gap-y-2">
          <h1 className="text-sm md:text-xl flex  flex-row items-center gap-x-3 ">
            {message} <Logo />
          </h1>
          {linkTo && (
            <Link to={linkTo}>
              <Button>{buttonText}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
