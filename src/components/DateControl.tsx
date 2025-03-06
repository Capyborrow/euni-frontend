import {
  addWeeks,
  CalendarDayGridStyles,
  CalendarDayProps,
  DateRangeType,
} from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Button, Field, makeStyles } from "@fluentui/react-components";
import { useCallback, useState } from "react";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import { useDate } from "../hooks/useDate";
import { format } from "date-fns";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    maxWidth: "20rem",
  },
  control: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
});

const dateRangeOptions = {
  Day: DateRangeType.Day,
  "Work Week": DateRangeType.WorkWeek,
  Week: DateRangeType.Week,
  Month: DateRangeType.Month,
};

const DateControl = () => {
  const styles = useStyles();
  const { selectedDate, setSelectedDate } = useDate();

  const customDayCellRef: CalendarDayProps["customDayCellRef"] = useCallback(
    (
      element: HTMLElement | null,
      date: Date,
      classNames: CalendarDayGridStyles
    ) => {
      if (element) {
        element.title =
          "custom title from customDayCellRef: " + date.toString();

        if (date.getDay() === 0) {
          if (classNames.dayOutsideBounds) {
            element.classList.add(...classNames.dayOutsideBounds.split(" "));
          }
          const buttonElement = element.querySelector("button");
          if (buttonElement) {
            (buttonElement as HTMLButtonElement).disabled = true;
          }
        }
      }
    },
    []
  );

  const [dateRangeType] = useState("Work Week");

  const goPrevious = () =>
    setSelectedDate(selectedDate ? addWeeks(selectedDate, -1) : new Date());
  const goNext = () =>
    setSelectedDate(selectedDate ? addWeeks(selectedDate, 1) : new Date());

  const getWeekStartEnd = (date?: Date) => {
    if (!date) return "";
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 5);
    return format(weekStart, "MMM d") + " - " + format(weekEnd, "MMM d");
  };

  return (
    <div className={styles.root}>
      <Button
        appearance="subtle"
        className={styles.button}
        onClick={goPrevious}
        icon={<ChevronLeftRegular />}
      />
      <Field>
        <DatePicker
          calendar={{
            dateRangeType:
              dateRangeOptions[dateRangeType as keyof typeof dateRangeOptions],
            workWeekDays: [1, 2, 3, 4, 5, 6],
            calendarDayProps: { customDayCellRef },
            showSixWeeksByDefault: true,
          }}
          appearance="filled-darker"
          highlightCurrentMonth
          highlightSelectedMonth
          showWeekNumbers
          showGoToToday
          firstDayOfWeek={1}
          value={selectedDate}
          onSelectDate={setSelectedDate}
          placeholder="Select week"
          formatDate={getWeekStartEnd}
          className={styles.control}
        />
      </Field>
      <Button
        appearance="subtle"
        className={styles.button}
        onClick={goNext}
        icon={<ChevronRightRegular />}
      />
    </div>
  );
};

export default DateControl;
