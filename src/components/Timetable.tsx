import { Divider, Label, makeStyles, tokens } from "@fluentui/react-components";
import { startOfWeek, addDays, format } from "date-fns";
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
});

const Timetable: FC<{ lessons: LessonType[] }> = ({ lessons }) => {
  const styles = useStyles();
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as start of week
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeSlots = [
    ["", "8:40"],
    ["10:15", "10:35"],
    ["12:10", "12:20"],
    ["13:55", "14:05"],
    ["15:40", "15:50"],
    ["17:25", "17:35"],
    ["19:20", ""],
  ];

  return (
    <div className={styles.root}>
      <div style={{ gridRow: "1", gridColumn: "1", visibility: "hidden" }}>
        <Divider className={styles.dividerNone} alignContent="start">
          00:00
        </Divider>
      </div>
      {days.map((day, index) => {
        const date = addDays(startOfCurrentWeek, index);
        return (
          <div
            key={day}
            className={styles.label}
            style={{ gridColumn: index + 2 }}
          >
            <Label weight="semibold">{day}</Label>
            <Label>{format(date, "MMM d")}</Label>
          </div>
        );
      })}
      {timeSlots.map(([start, end], rowIndex) => (
        <div
          key={rowIndex}
          style={{
            gridColumn: "1/-1",
            gridRow: rowIndex * 2 + 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "1rem",
          }}
        >
          <Divider alignContent="start" className={styles.dividerRight}>
            {start}
            <br />
            {end}
          </Divider>
        </div>
      ))}
      {lessons.map(
        (
          {
            day,
            timeSlot,
            subject,
            teacherName: teacher,
            link,
            room,
            type,
            lessonStatus: status,
            assignmentStatus,
            commentStatus,
          },
          index
        ) => (
          <div
            key={index}
            style={{
              gridColumn: day + 2,
              gridRow: timeSlot * 2 + 3,
            }}
          >
            <Lesson
              subject={subject}
              teacher={teacher}
              room={room}
              link={link}
              type={type}
              status={status}
              assignmentStatus={assignmentStatus}
              commentStatus={commentStatus}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Timetable;
