import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  onClick: (name: string, email: string, password: string) => void;
}

export const SignUp: React.FC<SignupProps> = (props: SignupProps) => {
  const { onClick } = props;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col  w-96 items-center justify-center  border border-gray-300">
        <div className="flex flex-col gap-3 items-center p-4">
          <input
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            placeholder="enter your name here"
            type="text"
            name="name"
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            placeholder="email here"
            type="email"
            name="email"
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            placeholder="enter the password here"
            name="password"
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 my-1 px-1 py-0.5 border border-blue-300 cursor-pointer rounded-md"
          onClick={() => onClick(name, email, password)}
        >
          SIGN UP
        </button>
        <p>
          Already have an account?
          <button
            className="cursor-pointer text-blue-400 ml-0.5"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
