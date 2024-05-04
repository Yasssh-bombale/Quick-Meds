import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  widthFull?: boolean;
};

const LoadingButton = ({ widthFull = false }: Props) => {
  return (
    <Button
      type="button"
      className={`${widthFull && "w-full cursor-not-allowed"}`}
    >
      <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />
      Loading...
    </Button>
  );
};

export default LoadingButton;
