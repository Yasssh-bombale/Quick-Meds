import { Camera } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

const formSchema = z.object({
  imageFile: z.instanceof(File, { message: "image is required" }),
  imageUrl: z.string().optional(),
  prescription: z
    .string({
      required_error: "Prescription is required",
    })
    .min(1, { message: "Prescription is required" }),
});

export type prescriptionFormData = z.infer<typeof formSchema>;

// export type prescriptionData = {
//   imageFile: File;
//   prescription: string;
// };

type Props = {
  onSave: (formData: prescriptionFormData) => void;
};

const StoreInputPrescription = ({ onSave }: Props) => {
  const form = useForm<prescriptionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prescription: "",
    },
  });
  // const [formData, setFormData] = useState<prescriptionData>();
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (formDataJson: prescriptionFormData) => {
    const formData = new FormData();
    // note: image url is not exist on the submited values called it formDataJson we need to append our key value pairs using formData() ;

    const storage = getStorage(app);
    const fileName = new Date().getTime() + formDataJson.imageFile?.name!;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(
      storageRef,
      formDataJson.imageFile!
    );
    let imageUrl: string;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("image upload starting", snapshot);
      },
      (error) => {
        console.log(`Error while uploading to the firebase, ${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            imageUrl = downloadUrl;
          })
          .then(() => {
            console.log(imageUrl);
            formData.append("imageUrl", imageUrl);
            formDataJson.imageUrl = imageUrl;
            console.log(formDataJson);
            onSave(formDataJson);
          });
      }
    );
  };

  return (
    <div className="border rounded-lg p-2 flex items-center gap-x-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex p-2 items-center w-full gap-x-2 flex-wrap"
        >
          <div>
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
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="What's your prescription?? for today ??"
                    className="border-none focus-visible:ring-0 focus-visible:ring-transparent outline-none"
                  />
                </FormControl>
                <FormMessage className="ml-4" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full px-4 mt-2">
            Send prescription
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StoreInputPrescription;
