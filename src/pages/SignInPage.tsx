import { useSignIn } from "@/api/AuthApi";
import SignInForm from "@/forms/authforms/SignInForm";

const SignIn = () => {
  const { signInRequest, isLoading } = useSignIn();

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      {/* form */}
      <SignInForm onSave={signInRequest} isLoading={isLoading} />
    </div>
  );
};

export default SignIn;
