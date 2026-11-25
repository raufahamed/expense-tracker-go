import "./App.css";
import { AppRoutes } from "./components/routes/AppRoutes";
import { logoutUser } from "./services/auth";
import { resetAuthStore } from "./store/auth/actions";
import { Profile } from "./components/pages/Profile";
import { useAuthStore } from "./store/auth/authstore";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      resetAuthStore();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="  flex items-center justify-between w-full p-4">
        <div className="text-2xl text-gray-600">Expense Tracker</div>
        <Profile
          user={user}
          onLogout={() => {
            handleLogout();
          }}
        />
      </div>

      <div>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
