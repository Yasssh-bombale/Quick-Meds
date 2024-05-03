import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

type Props = {
  backTo: string;
};

const BackButton = ({ backTo }: Props) => {
  const navigate = useNavigate();

  return (
    <Button variant={"outline"} type="button" onClick={() => navigate(backTo)}>
      <ArrowLeftToLine size={"20px"} className="mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
