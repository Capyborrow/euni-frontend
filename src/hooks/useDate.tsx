import { useContext } from "react";
import DateContext from "../context/DateProvider";

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
