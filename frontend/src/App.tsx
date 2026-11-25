import "./App.css";
import { AppRoutes } from "./components/routes/AppRoutes";

function App() {
  return (
    <>
      <div className="text-2xl text-gray-600  flex items-center justify-center">
        <div>Expense Tracker</div>
      </div>

      <div>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
