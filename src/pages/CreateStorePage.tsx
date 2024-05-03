import CreateStoreForm from "@/forms/store-forms/CreateStoreForm";

import img1 from "../img/createStoreImage1.png";
const CreateStorePage = () => {
  return (
    <div className="flex flex-row border-2  border-[#9E3FFD] rounded-md mt-10 p-2">
      <img
        src={img1}
        alt="error"
        className="h-96 w-96 object-cover hidden md:block"
      />
      <div className="p-2  w-full ">
        <CreateStoreForm />
      </div>
    </div>
  );
};

export default CreateStorePage;
