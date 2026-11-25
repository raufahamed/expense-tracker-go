import React from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";

interface signupPageProps {
  signUp: (name: string, email: string, password: string) => void;
}

export const SignupPage: React.FC<signupPageProps> = (
  props: signupPageProps,
) => {
  const { signUp } = props;

  const navigate = useNavigate();

  async function handleSignIn(name: string, email: string, password: string) {
    try {
      await signUp(email, name, password);

      navigate("/login");
    } catch (error) {
      console.error("sign in failed", error);
    }
  }

  return <SignUp onClick={handleSignIn} />;
};
