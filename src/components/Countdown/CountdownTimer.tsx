import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

const CountdownTimer = ({monthDuration, yearDuration, monthCount, yearCount}: {monthDuration: boolean, yearDuration: boolean, monthCount: number, yearCount: number}) => {

  const [remainingTime, setRemainingTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let dateTarget;
    if (monthDuration) {
        dateTarget = dayjs().add(monthCount, 'month');
    } else if (yearDuration) {
        dateTarget = dayjs().add(yearCount, 'year');
    }
    // "2024-12-31T23:59:59Z" format
    const futureDate = dayjs(dateTarget); // Replace this with your future date/time

    const intervalId = setInterval(() => {
      const now = dayjs();
      const countdown = dayjs.duration(futureDate.diff(now));

      const years = countdown.years();
      const months = countdown.months();
      const days = countdown.days();
      const seconds = countdown.seconds();

      setRemainingTime({
        years,
        months,
        days,
        hours: 0, // Add the missing hours property
        minutes: 0, // Add the missing minutes property
        seconds,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-2xl flex w-3/4 text-center justify-around items-center">
      <div>
        <p className="text-cyan-600"> {remainingTime.years}</p>
        <p className="text-sm"> Year</p>
      </div>
      <div>
        <p className="text-cyan-600"> :{remainingTime.months}</p>
        <p className="text-sm"> Months</p>
      </div>
      <div>
        <p className="text-cyan-600"> :{remainingTime.days}</p>
        <p className="text-sm"> Days</p>
      </div>
      <div>
        <p className="text-cyan-600"> :{remainingTime.seconds}</p>
        <p className="text-sm"> Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
