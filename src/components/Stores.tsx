import { Store } from "@/types";
import { Card, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BriefcaseMedical, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  stores: Store[];
};

const Stores = ({ stores }: Props) => {
  const navigate = useNavigate();
  const cardClickHandler = (id: string) => {
    navigate({
      pathname: `/medicalstores/${id}`,
    });
  };

  return stores.map((store) => (
    <div
      key={store._id}
      className="p-2 max-w-[400px] md:max-w-6xl w-full overflow-hidden"
    >
      <Card
        onClick={() => cardClickHandler(store._id)}
        className="md:p-2  cursor-pointer flex items-center gap-x-2 md:gap-x-7 md:px-8 hover:shadow-lg"
      >
        <img
          src={store.imageUrl}
          alt="storePng"
          className="w-16 h-16 md:w-28 md:h-28 rounded-xl object-cover"
        />
        <div className="p-2">
          <div className="flex items-center gap-x-2">
            {/* <Activity size={25} className="text-red-400" /> */}
            <BriefcaseMedical size={26} className="text-green-500" />
            <CardTitle className="text-[16px] md:text-2xl font-semibold uppercase  w-28 md:w-80  truncate">
              {/* <Activity size={20} className="mr-3" /> */}
              {store.storeName}fffffffffffffffffffffffff
            </CardTitle>
          </div>
          <p className="text-zinc-500 flex items-center">
            <Phone size={"16px"} className="mr-2" /> +91{store.mobileNumber}
          </p>
        </div>

        {/* ownerName  and city*/}
        <div className="flex flex-col w-[70px] md:w-[480px]">
          <div className="flex  md:gap-x-4 md:p-2 md:justify-between md:items-center">
            <div>
              <Badge
                className="w-fit md:p-1 text-nowrap hidden md:block"
                variant={"green"}
              >
                Owner : {store.ownerName}
              </Badge>
            </div>
            <p className="text-sm font-bold md:font-normal md:text-lg border-b-2 border-[#9E3FFD] h-fit truncate">
              {store.city}
            </p>
          </div>
          {/* address */}
          <div className="hidden md:block md:w-[450px]">
            <p className="text-zinc-500 font-light truncate p-1">
              <span className="font-bold ">Address :</span>
              {store.address}
            </p>
          </div>
        </div>
      </Card>
    </div>
  ));
  // <div className="cursor-pointer">
  //   <Card className="p-2 flex gap-x-4">
  //     <img
  //       src="https://ideogram.ai/api/images/direct/0lLf097zQPWvmMa5YyHkSg.png"
  //       alt="storePng"
  //       className="w-20 h-20 rounded-xl object-cover"
  //     />
  //     <div className="border-2 p-2">
  //       <CardTitle className="text-xl md:text-2xl font-semibold uppercase">
  //         yashus medical
  //       </CardTitle>
  //       <p className="text-zinc-500">Contact no:1234567890</p>
  //     </div>

  //     {/* ownerName  and city*/}
  //     <div className="border flex flex-col">
  //       <div className="flex  gap-x-4 p-2 justify-between items-center">
  //         <div>
  //           <Badge className="w-fit p-1" variant={"green"}>
  //             Owner : yash
  //           </Badge>
  //         </div>
  //         <p className="text-lg font-normal  border-b-2 border-[#9E3FFD] h-fit ">
  //           Aurangabad
  //         </p>
  //       </div>
  //       {/* address */}
  //       <div className="w-64">
  //         <p className="text-zinc-500 font-light  border  truncate p-1">
  //           address blhkdjfkdf dkjdkdbkbvjjbdj maha hshshshhh
  //         </p>
  //       </div>
  //     </div>
  //   </Card>
  // </div>
};

export default Stores;
