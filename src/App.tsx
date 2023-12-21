import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./routes";
import CheckAverageSales from "./utils/Helpers/CheckAverageSales";
const App = () => {
  CheckAverageSales();
  return (
    <div>
      <MainRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
