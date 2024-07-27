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
import { Textarea } from "@/components/ui/textarea";
import { UpdatedUser } from "@/types";
import { useEffect } from "react";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
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
});

export type updateUserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: updateUserFormData) => void;
  updatedUser: UpdatedUser;
  backButton?: boolean;
  className?: string;
  isLoading: boolean;
};

const UpdateUserForm = ({
  onSave,
  updatedUser,
  backButton = false,
  isLoading,
  className,
}: Props) => {
  const form = useForm<updateUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: updatedUser.city || "",
      address: updatedUser.address || "",
      state: updatedUser.state || "",
      mobileNumber: updatedUser.mobileNumber || "",
    },
  });

  // const [isNextClick, setIsNextClick] = useState<boolean>(false);

  useEffect(() => {
    if (!updatedUser) {
      return;
    }

    form.reset(updatedUser);
  }, [form, updatedUser]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className={`space-y-3 p-10 bg-gray-50 rounded-lg ${className}`}
      >
        {backButton && <BackButton backTo="/" />}
        <div className="flex flex-col  md:gap-x-4 ">
          {/* city */}
          <FormField
            name="email"
            render={() => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="Chh.SambhajiNagar"
                    defaultValue={updatedUser.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex gap-2">
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
            {/* state */}
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
          </div>
        </div>
        <div className="flex flex-col  md:flex md:flex-row md:items-center md:gap-x-4">
          {/* check */}
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium">Address</FormLabel>
                <FormControl>
                  {/* <Input
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="street address.."
                    {...field}
                  /> */}
                  <Textarea
                    className="outline-none focus-visible:ring-1 focus-visible:ring-[#9E3FFD]"
                    placeholder="street address.."
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

        {isLoading ? (
          <LoadingButton
            widthFull
            className="bg-purple-600 hover:bg-purple-600"
          />
        ) : (
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-600"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UpdateUserForm;
