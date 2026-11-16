import "./App.css";
import { Toast } from "./components/ui/toast/Toast";

function App() {
  <>
    <div className="text-2xl text-gray-600  flex items-center justify-center">
      <div>Expense Tracker</div>
    </div>

    <div>
      <Toast message={"lakdaskdbasgd"} variant="success" />
    </div>
  </>;
}

export default App;
