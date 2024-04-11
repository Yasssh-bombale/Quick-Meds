import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AuthSVG from "@/components/AuthSVG";
import LoadingButton from "@/components/LoadingButton";
import OAuth from "@/components/OAuth";

const formSchema = z.object({
  email: z.string({
    required_error: "email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type SignInFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: SignInFormData) => void;
  isLoading: boolean;
};

const SignInForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: SignInFormData) => {
    onSave(values);
  };

  return (
    <div className="border border-[#9E3FFD] rounded-lg min-h-80 flex flex-col  max-w-3xl w-full gap-2 p-2">
      <div
        className={`bg-[#9E3FFD] h-fit px-2 py-1 rounded-lg cursor-pointer self-center`}
      >
        <Link to={"/"}>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Quick meds
          </h1>
        </Link>
      </div>
      <div className="flex w-full justify-between items-center">
        {/* svg  */}

        <AuthSVG />

        {/* svg */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2  flex-1 p-2"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold tracking-tight">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold tracking-tight">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <LoadingButton widthFull />
            ) : (
              <Button type="submit" className="w-full">
                SignIn
              </Button>
            )}

            <OAuth text="SignIn using Google" />
            <div className="flex items-center gap-5">
              Create an account?
              <Link to={"/signup"} className="text-blue-600">
                SignUp
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
