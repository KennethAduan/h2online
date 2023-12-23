import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./routes";
import CheckAverageSales from "./utils/Helpers/CheckAverageSales";
import { useEffect, useState } from "react";
import { CheckItemStocksFirebase } from "./firebase/services/notificationManager";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { COLORS } from "./themes";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
  },
});
const App = () => {
  const [deviceType, setDeviceType] = useState("desktop"); // Default to desktop
  CheckAverageSales(); // You might want to handle this similarly if it's causing re-renders

  useEffect(() => {
    // Perform actions when the App component mounts
    CheckItemStocksFirebase(); // Now this only triggers once when the App component mounts

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (deviceType === "mobile") {
    // Render a message or UI specific for mobile devices using Tailwind CSS
    return (
      <main className="flex flex-col items-center justify-center w-full h-screen bg-PrimaryBackGround">
        <h1 className="text-2xl font-extrabold tracking-widest text-white">
          Please Use a Desktop
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 mt-32 absolute">
          Page Not Found
        </div>
      </main>
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainRoutes />
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
};

export default App;
