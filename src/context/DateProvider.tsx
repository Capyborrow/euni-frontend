import { createContext, useState, useEffect, FC, ReactNode } from "react";

interface DateContextType {
  selectedDate: Date | null | undefined;
  setSelectedDate: (date: Date | null | undefined) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
    () => {
      const storedDate = localStorage.getItem("selectedDate");
      return storedDate ? new Date(storedDate) : undefined; // Allow undefined as initial state
    }
  );

  useEffect(() => {
    if (selectedDate !== undefined) {
      localStorage.setItem(
        "selectedDate",
        selectedDate ? selectedDate.toISOString() : ""
      );
    }
  }, [selectedDate]);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
