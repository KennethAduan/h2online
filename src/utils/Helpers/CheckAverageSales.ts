import GetAverageSales from "../../firebase/hooks/GetAverageSales";
import { AddNotificationsToFirebase } from "../../firebase/services/notificationManager";
import { useEffect } from "react";

const CheckAverageSales = () => {
  const message = "Average sales is below target";
  const title = "Sales Report";
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const startOfDayDelay = tomorrow.getTime() - now.getTime();
    const endOfDayDelay = startOfDayDelay + 24 * 60 * 60 * 1000;

    const timerStart = setTimeout(() => {
      GetAverageSales().then((average) => {
        console.log("Day started, average sales: " + average);
      });
    }, startOfDayDelay); // Delay until the start of the next day

    const timerEnd = setTimeout(() => {
      GetAverageSales().then((average) => {
        if (average >= 2750) {
          console.log("Target met or exceeded!");
        } else {
          AddNotificationsToFirebase(message, title);
          console.log("Below target, consider strategies to increase sales.");
        }
      });
    }, endOfDayDelay); // Delay until the end of the next day

    return () => {
      clearTimeout(timerStart); // Clear the timer when the component is unmounted
      clearTimeout(timerEnd); // Clear the timer when the component is unmounted
    };
  }, []);
  //   console.log("CheckAverageSales");
};

export default CheckAverageSales;
