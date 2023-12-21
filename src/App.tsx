import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from "./routes";
const App = () => {
  return (
    <div>
      <MainRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
