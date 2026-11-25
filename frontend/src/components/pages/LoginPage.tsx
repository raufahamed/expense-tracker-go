import React from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

interface props {
  onLogin: (email: string, password: string) => void;
}

export const LoginPage: React.FC<props> = (props: props) => {
  const { onLogin } = props;
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await onLogin(email, password);

      // Redirect after successful login
      navigate("/expenses");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <Login onClick={handleLogin} />;
};
