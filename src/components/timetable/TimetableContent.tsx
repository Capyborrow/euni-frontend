import { FC } from "react";
import Lesson from "./lesson/Lesson";
import { LessonType } from "../../types/lesson";

import { DayOfWeek } from "@fluentui/react-calendar-compat";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  lessonCell: {
    minHeight: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    visibility: "hidden",
  },
});

interface LessonCellsProps {
  daysOfWeek: DayOfWeek[];
  timeSlots: [Date, Date][];
  lessonLookup: { [key: string]: LessonType };
}

const TimetableContent: FC<LessonCellsProps> = ({
  daysOfWeek,
  timeSlots,
  lessonLookup,
}) => {
  const styles = useStyles();
  return (
    <>
      {daysOfWeek
        .map((_, dayIndex) =>
          timeSlots.map((_, slotIndex) => {
            const key = `${dayIndex + 1}-${slotIndex}`;
            const lesson = lessonLookup[key];
            return (
              <div
                key={key}
                className={styles.lessonCell}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: slotIndex * 2 + 3,
                }}
              >
                {lesson ? (
                  <Lesson lesson={lesson} />
                ) : (
                  <Lesson
                    lesson={{
                      id: `placeholder-${key}`,
                      date: new Date(),
                      subjectName: "",
                      className: styles.placeholder,
                    }}
                  />
                )}
              </div>
            );
          })
        )
        .flat()}
    </>
  );
};

export default TimetableContent;
