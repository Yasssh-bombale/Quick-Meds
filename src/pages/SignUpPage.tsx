import { useSignUp } from "@/api/AuthApi";
import SignUpForm from "@/forms/authforms/SignUpForm";

const SignUp = () => {
  const { signUpRequest, isLoading } = useSignUp();

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      {/* form */}
      <SignUpForm onSave={signUpRequest} isLoading={isLoading} />
    </div>
  );
};

export default SignUp;
