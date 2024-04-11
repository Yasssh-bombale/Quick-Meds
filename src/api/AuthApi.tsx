// import { UserFormData } from "@/forms/authforms/SignUpForm";

import { SignInFormData } from "@/forms/authforms/SignInForm";
import { UserFormData } from "@/forms/authforms/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUpRequest = async (formData: UserFormData) => {
    setIsLoading(true);
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      console.log(data?.message);
      return toast.error(data?.message);
    }
    setIsLoading(false);
    toast.success(data?.message);
    navigate("/signin");
  };

  return { signUpRequest, isLoading };
};

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signInRequest = async (formData: SignInFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        console.log(data?.message);
        return toast.error(data?.message || "Sign in failed please try again");
      }
      setIsLoading(false);
      navigate("/");
      toast.success(data?.message || "User signIn successfully");
    } catch (error) {
      console.log(`ERROR:While signInRequest ${error}`);
    }
  };

  return { signInRequest, isLoading };
};
