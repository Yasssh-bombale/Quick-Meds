import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { app } from "@/firebase";
import LoadingButton from "@/components/LoadingButton";
// import { Store } from "@/types";
import { useState } from "react";
// import ImageField from "@/components/ImageField";
import WebCamCapture from "@/components/WebCamCapture";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, TriangleAlert } from "lucide-react";

const formSchema = z.object({
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
  ownerLivePicture: z.string({
    required_error: "Owners picture is required",
  }),
  license: z.string().optional(),
  mobileNumber: z
    .string({
      required_error: "mobile number is required",
    })
    .min(10, { message: "Inavlid mobile number" })
    .max(10, { message: "Invalid mobile number" }),
  storeImage: z.string().optional(),
  storeImageFile: z.instanceof(File, { message: "Store Image is required" }),
  licenseImageFile: z.instanceof(File, { message: "License is required" }),
});

export type storeFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: storeFormData) => void;
  loading: boolean;
};

const CreateStoreForm = ({ onSave, loading }: Props) => {
  const [liveUserPicture, setLiveUserPicture] = useState<string | null>("");
  const form = useForm<storeFormData>({
    resolver: zodResolver(formSchema),
  });
  // const handleCapture = (imageSrc: string) => {
  //   setLiveUserPicture(imageSrc);
  // };
  const onSubmit = (formDataJson: storeFormData) => {
    const formData = new FormData();
    // note: image url is not exist on the submited values called it formDataJson we need to append our key value pairs using formData() ;
    console.log("submit");
    uploadImages(formDataJson, formData, onSave, liveUserPicture);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 p-10 bg-gray-50 rounded-lg"
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
          {/* check */}
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
        <div className="flex gap-x-4 items-center">
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
        <FormField
          name="storeImageFile"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-sm font-medium">Store Image</FormLabel>
              <FormDescription className="text-sm">
                Add an image that will displayed on your store listing
              </FormDescription>

              <div className="flex flex-col space-y-4 border-2">
                {/* {store?.imageUrl && <ImageField imageUrl={store?.imageUrl} />} */}

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
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="licenseImageFile"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-sm font-medium">
                Upload license
              </FormLabel>
              <FormDescription className="text-sm">
                Please upload the medical store owner's license. This license is
                required to verify that the owner has the necessary credentials
                to operate a medical store.
              </FormDescription>
              <Alert className="border border-red-500">
                <TriangleAlert size={25} color="red" />
                <div className="flex flex-col ml-2">
                  <AlertDescription>
                    Uploaded license must be a valid and legal document. Any
                    attempt to upload an invalid or fraudulent license will
                    result in the immediate termination of the application and
                    may lead to further{" "}
                    <span className="font-semibold">legal action</span>.
                  </AlertDescription>
                </div>
              </Alert>

              <div className="flex flex-col space-y-4 border-2">
                {/* {store?.imageUrl && <ImageField imageUrl={store?.imageUrl} />} */}

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
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="ownerLivePicture"
          control={form.control}
          render={() => (
            <FormItem className="flex-1">
              <FormLabel className="text-sm font-medium">
                Owner Live Picture
              </FormLabel>
              <Alert className="border border-red-500">
                <TriangleAlert size={25} color="red" />
                <div className="flex flex-col ml-2">
                  <AlertTitle>Attention!</AlertTitle>
                  <AlertDescription>
                    To ensure the authenticity of the store owner, please
                    capture a live photo with the following guidelines:
                  </AlertDescription>
                </div>
              </Alert>
              <ul className="flex flex-col gap-1 ml-9">
                <li className="list-decimal font-light">
                  Use a device with a camera.
                </li>
                <li className="list-decimal font-light">
                  Ensure the area is well-lit and the background is plain.
                </li>
                <li className="list-decimal font-light">
                  Center your face in the frame, ensuring it is fully visible.
                </li>
                <li className="list-decimal font-light">
                  Avoid wearing any items that obscure your face.
                </li>
                <li className="list-decimal font-light">
                  Capture the photo and ensure it is clear and focused.
                </li>
                <li className="list-decimal font-light">
                  Upload the photo as instructed. Rest assured, your photo and
                  License will be used solely for verification purposes and will
                  be handled securely.
                </li>
              </ul>
              <WebCamCapture
                onCapture={(imageSrc) => {
                  form.setValue("ownerLivePicture", imageSrc);
                  setLiveUserPicture(imageSrc);
                }}
              />
              {form.formState.errors.ownerLivePicture && !liveUserPicture && (
                <p className="text-red-600 text-sm mt-2 font-semibold">
                  {form.formState.errors.ownerLivePicture.message}
                </p>
              )}
            </FormItem>
          )}
        />
        {/* <WebCamCapture onCapture={handleCapture} /> */}
        {/* submit button */}
        {loading ? (
          <LoadingButton widthFull />
        ) : (
          <Button
            onClick={() => {
              console.log("submit button clicked");
            }}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};
const uploadImages = async (
  formDataJson: storeFormData,
  formData: FormData,
  onSave: (formData: storeFormData) => void,
  liveUserPicture: string | null
) => {
  const storage = getStorage(app);

  const uploadFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("image upload starting", snapshot);
        },
        (error) => {
          console.log(`Error while uploading to the firebase, ${error}`);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  try {
    //upload storeImage;
    formDataJson.storeImage = await uploadFile(formDataJson.storeImageFile);
    formData.append("storeImage", formDataJson.storeImage);
    //upload license;
    formDataJson.license = await uploadFile(formDataJson.licenseImageFile);
    formData.append("license", formDataJson.license);

    if (liveUserPicture) {
      formDataJson.ownerLivePicture = liveUserPicture;
    }
    // console.log(formDataJson);
    onSave(formDataJson);
  } catch (error) {
    console.log(`ERROR:WHILE UPLOADING IMAGES,${error}`);
  }
};
export default CreateStoreForm;
