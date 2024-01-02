// calculateTargetDate.js
import dayjs from "dayjs";

export const calculateTargetDate = (itemId: string): dayjs.Dayjs => {
  switch (itemId) {
    case "Membrane123":
      return dayjs().add(1, "year");
    case "FilterSet123":
      return dayjs().add(1, "month");
    case "SedimentFilter123":
      return dayjs().add(1, "month");
    case "SolarSalt123":
      return dayjs().add(2, "months");
    default:
      return dayjs(); // Return current date for unknown itemId
  }
};
