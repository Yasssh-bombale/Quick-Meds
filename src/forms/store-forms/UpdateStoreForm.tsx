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
import { Store } from "@/types";
import { useEffect } from "react";
import ImageField from "@/components/ImageField";

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
  mobileNumber: z
    .string({
      required_error: "mobile number is required",
    })
    .min(10, { message: "Inavlid mobile number" })
    .max(10, { message: "Invalid mobile number" }),
  storeImage: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export type storeFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: storeFormData) => void;
  store?: Store;
  loading: boolean;
};

const UpdateStoreForm = ({ onSave, loading, store }: Props) => {
  const form = useForm<storeFormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!store) {
      return;
    }

    form.reset(store);
  }, [form, store]);
  let imageUrl = "";
  const onSubmit = async (formDataJson: storeFormData) => {
    // setLoading(true);
    const formData = new FormData();
    // note: image url is not exist on the submited values called it formDataJson we need to append our key value pairs using formData() ;
    console.log("formDataJson in submit fun", formDataJson);

    if (formDataJson.imageFile) {
      uploadImage(formDataJson, formData);
      form.reset(); //reseting input values to be "";
    } else {
      // TODO:
      onSave(formDataJson);
      form.reset(); //reseting input values to be "";
    }
  };

  const uploadImage = async (
    formDataJson: storeFormData,
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
          formData.append("storeImage", imageUrl); //because formDataJson doest not contain prescriptionImage key value pair;
          formDataJson.storeImage = imageUrl;

          onSave(formDataJson);
        });
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 p-10 bg-gray-50 rounded-lg"
      >
        <BackButton backTo="/home" />
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
          {/* <FormField
            name="imageFile"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">Image</FormLabel>
                <FormDescription className="text-sm">
                  Add an image that will displayed on your store listing
                </FormDescription>

                <div className="flex flex-col space-y-4 border-2">
                  {store?.imageUrl && <ImageField imageUrl={store?.imageUrl} />}
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
          /> */}
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
          name="imageFile"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-sm font-medium">Image</FormLabel>
              <FormDescription className="text-sm">
                Add an image that will displayed on your store listing
              </FormDescription>

              <div className="flex flex-col space-y-4 border-2">
                {store?.imageUrl && <ImageField imageUrl={store?.imageUrl} />}

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
        {/* submit button */}
        {loading ? (
          <LoadingButton widthFull />
        ) : (
          <Button disabled={loading} type="submit" className="w-full">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UpdateStoreForm;
