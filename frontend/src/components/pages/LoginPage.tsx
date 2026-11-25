import React from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { getUser } from "../../services/auth";
import { updateAuthStore } from "../../store/auth/actions";

interface props {
  onLogin: (email: string, password: string) => void;
}

export const LoginPage: React.FC<props> = (props: props) => {
  const { onLogin } = props;
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await onLogin(email, password);
      const user = await getUser();
      updateAuthStore(user);

      // Redirect after successful login
      navigate("/expenses");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <Login onClick={handleLogin} />;
};
