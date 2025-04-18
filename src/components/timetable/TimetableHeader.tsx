import { FC } from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import { addDays, format } from "date-fns";
import { DayOfWeek } from "@fluentui/react-calendar-compat";

const useStyles = makeStyles({
  label: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
});

interface TimetableHeaderProps {
  startOfWeek: Date;
  daysOfWeek: DayOfWeek[];
}

const TimetableHeader: FC<TimetableHeaderProps> = ({
  startOfWeek,
  daysOfWeek,
}) => {
  const styles = useStyles();
  return (
    <>
      {daysOfWeek.map((day, index) => {
        const date = addDays(startOfWeek, index);
        return (
          <Button
            appearance="transparent"
            key={day.toString()}
            className={styles.label}
            style={{ gridColumn: index + 2 }}
          >
            {day} {format(date, "MMM d")}
          </Button>
        );
      })}
    </>
  );
};

export default TimetableHeader;
