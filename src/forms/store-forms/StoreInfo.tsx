import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Store } from "@/types";
import { BriefcaseMedical } from "lucide-react";
import { Order } from "@/types";
import OrderPrescription from "@/components/OrderPrescription";

type Props = {
  store: Store;
  orders?: Order[];
};
const StoreInfo = ({ store, orders }: Props) => {
  return (
    <>
      <div className="flex items-center gap-x-4 border-2 border-green-500">
        <img
          className="h-28 w-28 object-cover rounded-full"
          src={store?.imageUrl}
          alt="storeImg"
        />
        {/* storeName and address */}
        <div className="border flex flex-col items-center overflow-hidden">
          <div className="flex items-center gap-x-4 border border-green-500 justify-between">
            <h1 className="uppercase text-xl md:text-4xl md:px-3 font-semibold flex items-center mb-2">
              <span>
                <BriefcaseMedical size={34} className="text-green-500 mr-4" />
              </span>
              {store?.storeName}
            </h1>
            {/*  city */}

            <h1 className="text-xl md:text-3xl font-semibold uppercase truncate w-52  text-center">
              {store?.city}
            </h1>
          </div>
          {/* <p className="border border-red-500 w-[600px] text-zinc-500 truncate hover:text-clip overflow-hidden ">
      {store?.address}hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjhhhhhhhhhhhhhhh
    </p> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <Button variant="outline">Hover</Button> */}
                <p className="border border-red-500 cursor-pointer  w-[600px] text-zinc-500 truncate hover:text-clip overflow-hidden ">
                  {store?.address}
                  hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjhhhhhhhhhhhhhhh
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {store?.address}
                  hjjbfijvijgibibjbijbdijbijdfbjifbjirhjrihbrejihbreijhbrejihbrejihbrehbrejihberjihb
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Separator className="my-4" />

      <OrderPrescription orders={orders} />
    </>
  );
};

export default StoreInfo;
