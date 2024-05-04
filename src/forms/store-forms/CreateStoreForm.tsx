import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { app } from "@/firebase";

const formSchema = z
  .object({
    storeName: z.string({
      required_error: "Store name is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    state: z.string({
      required_error: "State is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    mobileNumber: z
      .string({
        required_error: "mobile number is required",
      })
      .max(10, { message: "Invalid mobile number" }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image file or image url must be present",
    path: ["imageFile"],
  });

export type storeFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: storeFormData) => void;
};

const CreateStoreForm = ({ onSave }: Props) => {
  const form = useForm<storeFormData>({
    resolver: zodResolver(formSchema),
  });
  const [imageFile, setImageFile] = useState<File>();
  const [downloadUrl, setDownloadUrl] = useState("");

  console.log(`Global download url ${downloadUrl}`);

  const onSubmit = async (formDataJson: storeFormData) => {
    const formData = new FormData();
    // note: image url is not exist on the submited values called it formDataJson we need to append our key value pairs using formData() ;

    // if (downloadUrl) {
    //   console.log(downloadUrl);
    //   formData.append("imageUrl", downloadUrl);
    // }
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
          console.log(`firebase url = ${downloadUrl}`);
          setDownloadUrl(downloadUrl);
          formDataJson.imageUrl = downloadUrl;
        });
      }
    );

    console.log(formDataJson);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 p-10 bg-gray-50 rounded-lg"
      >
        <BackButton backTo="/" />
        <div className="flex gap-x-4">
          <FormField
            name="storeName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">
                  Store name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="xyz medical"
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">Address</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="street address.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <FormField
            name="state"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">State</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="Maharashtra"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">City</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="Chh.SambhajiNagar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <FormField
            name="imageFile"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">Image</FormLabel>
                <FormControl className="cursor-pointer">
                  <Input
                    type="file"
                    accept={".jpg, .jpeg, .png"}
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="mobileNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">
                  Mobile number
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="+91 4242424242"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* submit button */}
        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateStoreForm;
