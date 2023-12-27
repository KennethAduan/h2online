import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const CountdownTimer = ({
  monthDuration,
  yearDuration,
  monthCount,
  yearCount,
}: {
  monthDuration: boolean;
  yearDuration: boolean;
  monthCount: number;
  yearCount: number;
}) => {
  const [remainingTime, setRemainingTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let dateTarget:any;
  
    if (monthDuration) {
      dateTarget = dayjs().add(monthCount, "month");
    } else if (yearDuration) {
      dateTarget = dayjs().add(yearCount, "year");
    }
  
    const intervalId = setInterval(() => {
      const now = dayjs().tz('Asia/Manila');
      const futureDate = dateTarget;
  
      const diff = futureDate.diff(now);
      if (diff <= 604800000) { // 1 week in milliseconds
        console.log('1 week remaining');
      }
  
      const countdown = dayjs.duration(futureDate.diff(now));
  
      if (countdown.months() <= 2 && countdown.years() === 0) {
        console.log('2 months remaining');
      }
  
      const years = countdown.years();
      const months = countdown.months();
      const days = countdown.days();
      const hours = countdown.hours();
      const minutes = countdown.minutes();
      const seconds = countdown.seconds();
  
      setRemainingTime({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [monthCount, monthDuration, yearCount, yearDuration]);
  

  return (
    <div className="flex items-center justify-around w-3/4 text-2xl text-center">
      <div>
        <p className="text-SecondaryBackGround"> {remainingTime.years}</p>
        <p className="text-sm"> Year</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.months}</p>
        <p className="text-sm"> Months</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.days}</p>
        <p className="text-sm"> Days</p>
      </div>
      {/* <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.hours}</p>
        <p className="text-sm"> Hours</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.minutes}</p>
        <p className="text-sm"> Minutes</p>
      </div> */}
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.seconds}</p>
        <p className="text-sm"> Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
