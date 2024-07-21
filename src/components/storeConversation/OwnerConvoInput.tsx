import { Camera, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import LoadingButton from "../LoadingButton";

const formSchema = z.object({
  imageFile: z.instanceof(File, { message: "image is required" }),
  prescriptionImage: z.string().optional(),
  prescription: z
    .string({
      required_error: "Prescription is required",
    })
    .min(1, { message: "Prescription is required" }),
  amount: z
    .string({ required_error: "Amount is required" })
    .min(2, { message: "Minimum 2 digits required" }),
});

export type ownerPrescriptionFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: ownerPrescriptionFormData) => void;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const OwnerConvoInput = ({ onSave, isLoading, setLoading }: Props) => {
  const form = useForm<ownerPrescriptionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prescription: "",
      amount: "",
    },
  });
  // const [formData, setFormData] = useState<prescriptionData>();
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  let imageUrl = "";

  const onSubmit = async (formDataJson: ownerPrescriptionFormData) => {
    setLoading(true);
    const formData = new FormData();
    // note: image url is not exist on the submited values called it formDataJson we need to append our key value pairs using formData() ;

    if (formDataJson.imageFile) {
      uploadImage(formDataJson, formData);
      form.reset(); //reseting input values to be "";
    }
  };

  const uploadImage = async (
    formDataJson: ownerPrescriptionFormData,
    formData: FormData
  ) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + formDataJson.imageFile?.name!;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(
      storageRef,
      formDataJson.imageFile!
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("image upload starting", snapshot);
      },
      (error) => {
        console.log(`Error while uploading to the firebase, ${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          // imageUrl = downloadUrl;
          imageUrl = downloadUrl;
          formData.append("prescriptionImage", imageUrl); //because formDataJson doest not contain prescriptionImage key value pair;
          formDataJson.prescriptionImage = imageUrl;
          onSave(formDataJson);
        });
      }
    );
  };

  return (
    <div className="border rounded-lg p-2 flex items-center gap-x-2  h-fit mb-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex p-2 items-center w-full gap-x-2 flex-wrap"
        >
          <div>
            {/* filePickerRef.current?.click() */}
            <div
              onClick={() => filePickerRef.current?.click()}
              className="bg-[#9E3FFD] hover:bg-[#9E3FFD]/80 w-fit p-2 text-white rounded-full cursor-pointer"
            >
              <Camera />
            </div>
            <FormField
              name="imageFile"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="hidden">
                    <Input
                      type="file"
                      accept={".jpg, .jpeg, .png"}
                      ref={
                        filePickerRef as React.MutableRefObject<HTMLInputElement>
                      }
                      onChange={(event) =>
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="mt-7" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="prescription"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" rounded-md  flex-1 border">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Example:Ctrizine for cold,human actrapid soluble insuline injection 40 ml"
                    className="border-none focus-visible:ring-1 focus-visible:ring-violet-600 outline-none"
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border rounded-md relative">
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    placeholder="10₹"
                    className="border-none focus-visible:ring-1 focus-visible:ring-violet-600 outline-none w-32"
                  />
                </FormControl>
                <FormMessage className="ml-4  absolute -left-2  w-48 line-clamp-1" />
              </FormItem>
            )}
          />

          {isLoading ? (
            <LoadingButton
              className={"bg-violet-600 hover:bg-violet-600 cursor-not-allowed"}
            />
          ) : (
            <Button
              disabled={isLoading}
              type="submit"
              className={`px-4 flex items-center bg-violet-600 hover:bg-violet-600 hover:opacity-85`}
            >
              Create Order{" "}
              <SendHorizontal
                className="ml-2 mt-1"
                size={20}
                strokeWidth={1.5}
              />
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default OwnerConvoInput;
