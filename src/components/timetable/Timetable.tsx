import { FC, useMemo, useCallback } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DayOfWeek } from "@fluentui/react-calendar-compat";
import { isWithinInterval } from "date-fns";
import { LessonType } from "../../types/lesson";
import TimetableHeader from "./TimetableHeader";
import TimetableDividers from "./TimetableDividers";
import TimetableContent from "./TimetableContent";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "min-content repeat(6, minmax(10rem, 1fr))",
    gridTemplateRows: "auto repeat(6, min-content 1fr)",
    columnGap: "1rem",
    height: "fit-content",
    width: "100%",
    overflow: "auto",
  },
});

interface TimetableProps {
  lessons: LessonType[];
  timeSlots: [Date, Date][];
  startOfWeek: Date;
}

const Timetable: FC<TimetableProps> = ({ lessons, timeSlots, startOfWeek }) => {
  const styles = useStyles();

  const getTimeSlot = useCallback(
    (date: Date): number | null => {
      const normalizedDate = new Date(
        1970,
        0,
        1,
        date.getHours(),
        date.getMinutes()
      );
      for (let i = 0; i < timeSlots.length; i++) {
        const [start, end] = timeSlots[i];
        if (isWithinInterval(normalizedDate, { start, end })) return i;
      }
      return null;
    },
    [timeSlots]
  );

  const lessonLookup = useMemo(() => {
    return lessons.reduce<{ [key: string]: LessonType }>((acc, lesson) => {
      const day = lesson.date.getDay();
      const slot = getTimeSlot(lesson.date);
      if (slot !== null) acc[`${day}-${slot}`] = lesson;
      return acc;
    }, {});
  }, [lessons, getTimeSlot]);

  const daysOfWeek = useMemo(
    () => Object.values(DayOfWeek).slice(1, 7) as DayOfWeek[],
    []
  );

  return (
    <div className={styles.root}>
      <TimetableHeader startOfWeek={startOfWeek} daysOfWeek={daysOfWeek} />
      <TimetableDividers timeSlots={timeSlots} />
      <TimetableContent
        daysOfWeek={daysOfWeek}
        timeSlots={timeSlots}
        lessonLookup={lessonLookup}
      />
    </div>
  );
};

export default Timetable;
