import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

type Props = {
  backTo: string;
  className?: string;
};

const BackButton = ({ backTo, className }: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={"outline"}
      className={`${className} border border-[#9E3FFD] mt-2`}
      type="button"
      onClick={() => navigate(backTo)}
    >
      <ArrowLeftToLine size={"20px"} className={`mr-2`} />
      Back
    </Button>
  );
};

export default BackButton;
