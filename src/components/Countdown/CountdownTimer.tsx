/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import { SetStatusExpire } from "@/firebase/services/inventoryManager";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const CountdownTimer = ({
  monthDuration,
  yearDuration,
  monthCount,
  yearCount,
  itemCode,
  resetFlag,
}: {
  monthDuration: boolean;
  yearDuration: boolean;
  monthCount: number;
  yearCount: number;
  itemCode: string;
  resetFlag: boolean;
}) => {
  const isTimerReset = () => {
    const { years, months, days, hours, minutes, seconds } = remainingTime;
    return (
      years === 0 &&
      months === 0 &&
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0
    );
  };

  const [remainingTime, setRemainingTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let dateTarget: any;

    if (monthDuration) {
      dateTarget = dayjs().add(monthCount, "month");
    } else if (yearDuration) {
      dateTarget = dayjs().add(yearCount, "year");
    }
    dateTarget = dayjs().add(1, "month");
    // dateTarget = dayjs("2023-12-29T22:25:59").tz('Asia/Manila');
    const intervalId = setInterval(() => {
      const now = dayjs().tz("Asia/Manila");
      const futureDate = dateTarget;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exactDate = dateTarget.format("YYYY-MM-DD HH:mm:ss");

      //Eto na yun Kenneth ipasok mo sa firebase para solid solid kasi ang nangyayari ngayon sa tuwing
      // nagrerender yung inventory umuulit lang yung timer so ang gagawin ilalagay
      // yung exact date nung nag reset then ipapasok dun sa target date yung date 1 month or 2 motnhs from now.
      // console.log("exactDate", exactDate);

      const diff = futureDate.diff(now);

      if (diff <= 0) {
        // Time is up, clear the interval
        clearInterval(intervalId);
        console.log("test 123");

        // Set remaining time to zero
        setRemainingTime({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        // Check if the timer is at 0
        console.log("isTimerReset", isTimerReset());
        console.log("itemCode", itemCode);

        // if (isTimerReset() && itemCode === "Membrane123" || itemCode === "FilterSet123" || itemCode === "SedimentFilter123" || itemCode === "SolarSalt123") {
        //   console.log('timer reset');
        //   SetStatusExpire(itemCode, isTimerReset);
        // }

        return;
      }

      if (diff <= 604800000) {
        // 1 week in milliseconds
        console.log("1 week remaining");
      }

      const countdown = dayjs.duration(futureDate.diff(now));

      if (
        itemCode === "Membrane123" &&
        countdown.months() <= 2 &&
        countdown.years() === 0
      ) {
        // console.log("2 months remaining");
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
    }, 100);

    return () => clearInterval(intervalId);
  }, [monthCount, monthDuration, yearCount, yearDuration, resetFlag, itemCode]);

  // useEffect(() => {
  //   if (isTimerReset() && (itemCode === "Membrane123" || itemCode === "FilterSet123" || itemCode === "SedimentFilter123" || itemCode === "SolarSalt123")) {
  //     console.log('timer reset');
  //     SetStatusExpire(itemCode, isTimerReset);
  //   }
  // }, [remainingTime]);

  return (
    <div className="flex items-center justify-around w-3/4 space-x-3 text-2xl text-center">
      <div>
        <p className="text-SecondaryBackGround"> {remainingTime.years}</p>
        <p className="text-xs"> Year</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.months}</p>
        <p className="text-xs"> Months</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.days}</p>
        <p className="text-xs"> Days</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.hours}</p>
        <p className="text-xs"> Hours</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.minutes}</p>
        <p className="text-xs"> Minutes</p>
      </div>
      <div>
        <p className="text-SecondaryBackGround"> :{remainingTime.seconds}</p>
        <p className="text-xs"> Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
