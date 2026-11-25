import { Routes, Route, Navigate } from "react-router-dom";

import { Expense } from "../expense/Expense";
import { loginUser, signUpUser } from "../../services/auth";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      {/* Authentication routes */}
      <Route path="/signup" element={<SignupPage signUp={signUpUser} />} />
      <Route path="/login" element={<LoginPage onLogin={loginUser} />} />

      {/* Expense tracker */}
      <Route path="/expenses" element={<Expense />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
