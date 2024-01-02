import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  setTargetDate,
  resetTargetDate,
  setTimePercentage,
} from "@/utils/redux/slice/countdownSlice";
import { useAppSelector, useAppDispatch } from "@/utils/redux/hooks";
import { calculateTargetDate } from "../../utils/Helpers/calculateTargetDate";
import { toast } from "react-toastify";
import { UpdateMaxStocks } from "@/firebase/services/inventoryManager";
interface CountdownTimerProps {
  itemId: string;
  resetFlag: boolean;
}

interface TimeLeft {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountDownTimerV2: React.FC<CountdownTimerProps> = ({
  itemId,
  resetFlag,
}) => {
  const dispatch = useAppDispatch();
  const targetDates = useAppSelector((state) => state.countdown.targetDates);
  const resetFlags = useAppSelector((state) => state.countdown.resetFlags);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  dayjs.extend(relativeTime);
  // Calculate and dispatch the time percentage
  const calculateAndDispatchTimePercentage = useCallback(
    (targetDate: string) => {
      const now = dayjs();
      const end = dayjs(targetDate);
      const totalDuration = end.diff(dayjs(targetDates[itemId])); // total time from start to target
      const remaining = end.diff(now); // time from now to end
      const percentage = Math.max(
        0,
        Math.min(100, (remaining / totalDuration) * 100)
      );

      dispatch(setTimePercentage({ itemId, percentage }));
    },
    [itemId, targetDates, dispatch]
  );

  // Effect to handle initialization and reset of the countdown
  useEffect(() => {
    if (
      !targetDates ||
      !targetDates[itemId] ||
      resetFlag !== (resetFlags && resetFlags[itemId])
    ) {
      const newTargetDate = calculateTargetDate(itemId).toISOString();
      dispatch(setTargetDate({ itemId, targetDate: newTargetDate }));
      dispatch(resetTargetDate({ itemId, resetFlag }));
      UpdateMaxStocks(itemId, 500);
      toast.success("Time updated successfully");
    }
  }, [itemId, resetFlag, targetDates, resetFlags, dispatch]);

  const calculateTimeLeft = (date: string) => {
    const difference = +dayjs(date) - +dayjs();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        years: Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000)),
        months: Math.floor((difference / (30.44 * 24 * 60 * 60 * 1000)) % 12),
        days: Math.floor((difference / (24 * 60 * 60 * 1000)) % 30.44),
        hours: Math.floor((difference / (60 * 60 * 1000)) % 24),
        minutes: Math.floor((difference / (60 * 1000)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    // Update the time left every second
    const timer = setInterval(() => {
      if (targetDates && targetDates[itemId]) {
        setTimeLeft(calculateTimeLeft(targetDates[itemId]));
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [itemId, targetDates]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (targetDates[itemId]) {
        calculateAndDispatchTimePercentage(targetDates[itemId]);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [itemId, targetDates, dispatch, calculateAndDispatchTimePercentage]);

  return (
    <div className="flex items-center justify-around w-3/4 space-x-3 text-2xl text-center">
      <div>
        <p className="text-AccentFontColor"> {timeLeft.years}</p>
        <p className="text-xs"> Year</p>
      </div>
      <div>
        <p className="text-AccentFontColor"> :{timeLeft.months}</p>
        <p className="text-xs"> Months</p>
      </div>
      <div>
        <p className="text-AccentFontColor"> :{timeLeft.days}</p>
        <p className="text-xs"> Days</p>
      </div>
      <div>
        <p className="text-AccentFontColor"> :{timeLeft.hours}</p>
        <p className="text-xs"> Hours</p>
      </div>
      <div>
        <p className="text-AccentFontColor"> :{timeLeft.minutes}</p>
        <p className="text-xs"> Minutes</p>
      </div>
      <div>
        <p className="text-AccentFontColor"> :{timeLeft.seconds}</p>
        <p className="text-xs"> Seconds</p>
      </div>
    </div>
  );
};

export default CountDownTimerV2;
