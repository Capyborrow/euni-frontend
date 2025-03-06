import {
  Button,
  Divider,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { DayOfWeek } from "@fluentui/react-calendar-compat";
import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  setHours,
} from "date-fns";
import Lesson from "./Lesson";
import { LessonType } from "../types/Lesson";
import { FC } from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "min-content repeat(6, 1fr)",
    gridTemplateRows: "auto repeat(6, min-content 1fr)",
    columnGap: "1rem",
    height: "fit-content",
    width: "100%",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  dividerRight: {
    "::before": {
      display: "none",
    },
  },
  dividerNone: {
    "::after": {
      display: "none",
    },
    "::before": {
      display: "none",
    },
  },

  currentLesson: {
    outline: "2px solid",
    outlineOffset: "2px",
    outlineColor: tokens.colorBrandForeground1,
  },
  placeholder: {
    visibility: "hidden",
  },
});

const Timetable: FC<{
  lessons: LessonType[];
  timeSlots: [Date, Date][];
  startOfWeek: Date;
}> = ({ lessons, timeSlots, startOfWeek }) => {
  const styles = useStyles();

  function getTimeSlot(date: Date): number | null {
    const normalizedDate = new Date(
      1970,
      0,
      1,
      date.getHours(),
      date.getMinutes()
    );
    for (let i = 0; i < timeSlots.length; i++) {
      const [start, end] = timeSlots[i];
      if (isWithinInterval(normalizedDate, { start, end })) {
        return i;
      }
    }
    return null;
  }

  function isCurrentLesson(date: Date): boolean {
    return (
      isSameDay(date, new Date()) &&
      getTimeSlot(date) === getTimeSlot(setHours(new Date(), 12))
    );
  }

  return (
    <div className={styles.root}>
      <div style={{ gridRow: "1", gridColumn: "1", visibility: "hidden" }}>
        <Divider className={styles.dividerNone} alignContent="start">
          00:00
        </Divider>
      </div>
      {Object.values(DayOfWeek)
        .slice(1, 7)
        .map((day, index) => {
          const date = addDays(startOfWeek, index);
          return (
            <Button
              appearance="transparent"
              key={day}
              className={styles.label}
              style={{ gridColumn: index + 2 }}
            >
              {day} {format(date, "MMM d")}
            </Button>
          );
        })}
      {timeSlots.map((_, index) => (
        <div
          key={index}
          style={{
            gridColumn: "1/-1",
            gridRow: index * 2 + 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "1rem",
          }}
        >
          <Divider alignContent="start" className={styles.dividerRight}>
            {index === 0 ? (
              <>
                <br />
                {format(timeSlots[index][0], "HH:mm")}
              </>
            ) : (
              <>
                {format(timeSlots[index - 1][1], "HH:mm")}
                <br />
                {format(timeSlots[index][0], "HH:mm")}
              </>
            )}
          </Divider>
        </div>
      ))}
      <div
        style={{
          gridColumn: "1/-1",
          gridRow: timeSlots.length * 2 + 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "1rem",
        }}
      >
        <Divider alignContent="start" className={styles.dividerRight}>
          {format(timeSlots[timeSlots.length - 1][1], "HH:mm")}
          <br />
        </Divider>
      </div>
      {timeSlots.map((_, slotIndex) =>
        Object.values(DayOfWeek)
          .slice(1, 7)
          .map((_, dayIndex) => {
            const lesson = lessons.find(
              (l) =>
                l.date.getDay() === dayIndex + 1 &&
                getTimeSlot(l.date) === slotIndex
            );

            return (
              <div
                key={`${dayIndex}-${slotIndex}`}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: slotIndex * 2 + 3,
                  minHeight: "5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {lesson ? (
                  <Lesson
                    className={
                      isCurrentLesson(lesson.date) ? styles.currentLesson : ""
                    }
                    subject={lesson.subjectName}
                    teacherName={lesson.teacherName}
                    teacherAvatar={lesson.teacherAvatar}
                    room={lesson.room}
                    link={lesson.link}
                    type={lesson.type}
                    status={lesson.lessonStatus}
                    assignmentStatus={lesson.assignmentStatus}
                    commentStatus={lesson.commentStatus}
                  />
                ) : (
                  <Lesson
                    subject=""
                    teacherName=""
                    room="0"
                    className={styles.placeholder}
                  />
                )}
              </div>
            );
          })
      )}
    </div>
  );
};

export default Timetable;
