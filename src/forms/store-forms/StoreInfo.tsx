import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Store } from "@/types";
import { BriefcaseMedical } from "lucide-react";

type Props = {
  store: Store;
  // orders?: Order[];
};
const StoreInfo = ({ store }: Props) => {
  return (
    <>
      <div className="flex  items-center justify-between gap-x-2 md:gap-x-4">
        <img
          className="h-14 w-14 md:h-28 md:w-28 border object-cover rounded-full"
          src={store?.imageUrl}
          alt="storeImg"
        />
        {/* storeName and address */}
        <div className="flex flex-col md:items-center">
          <div className="flex items-center gap-x-2 md:gap-x-4 justify-between w-72 md:w-full">
            <h1 className="uppercase text-xl md:text-4xl md:px-3 font-semibold flex items-center">
              <span>
                <BriefcaseMedical size={34} className="text-green-500 mr-4" />
              </span>
              <p className="truncate  w-44 md:w-72">{store?.storeName}</p>
            </h1>
            {/*  city */}

            <h1 className="hidden md:block md:text-3xl font-semibold uppercase truncate w-52  text-center">
              {store?.city}
            </h1>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <Button variant="outline">Hover</Button> */}
                <p className="md:mt-2 cursor-pointer w-[230px] md:w-[600px] text-zinc-500 truncate hover:text-clip overflow-hidden ">
                  {store?.address}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{store?.address}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Separator className="my-4" />
    </>
  );
};

export default StoreInfo;
