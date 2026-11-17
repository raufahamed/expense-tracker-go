import "./App.css";
import { Expense } from "./components/expense/Expense";

function App() {
  return (
    <>
      <div className="text-2xl text-gray-600  flex items-center justify-center">
        <div>Expense Tracker</div>
      </div>

      <div>
        <Expense />
      </div>
    </>
  );
}

export default App;
