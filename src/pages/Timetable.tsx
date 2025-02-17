import { makeStyles, shorthands } from "@fluentui/react-components";
import Lesson from "../components/LessonTest";

// Function to convert datetime into (day 1-7, time-span 1-5)
const convertLesson = (datetime: string) => {
  const date = new Date(datetime);
  const day = date.getDay() || 7; // Convert Sunday (0) to 7
  const hour = date.getHours();
  const timeSpan = Math.floor((hour - 8) / 2) + 1; // Assuming lessons start at 8 AM

  return timeSpan >= 1 && timeSpan <= 5 ? { day, timeSpan } : null;
};

// Sample lessons
const lessons = [
  {
    id: 1,
    subject: "Math",
    teacher: "Dr. Smith",
    datetime: "2025-02-17T09:30:00",
  }, // Monday
  {
    id: 2,
    subject: "Physics",
    teacher: "Prof. Brown",
    datetime: "2025-02-18T14:00:00",
  }, // Tuesday
];

const processedLessons = lessons
  .map((lesson) => ({ ...lesson, ...convertLesson(lesson.datetime) }))
  .filter((lesson) => lesson.day && lesson.timeSpan); // Remove invalid lessons

// Fluent UI Styles
const useStyles = makeStyles({
  timetable: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)", // 7 columns for Monday-Sunday
    gridTemplateRows: "repeat(5, 120px)", // 5 rows for time slots
    gap: "8px",
    ...shorthands.border("1px", "solid", "#ccc"),
    padding: "16px",
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    ...shorthands.border("1px", "solid", "#ddd"),
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
});

const Timetable = () => {
  const styles = useStyles();

  return (
    <div className={styles.timetable}>
      {/* Empty grid cells to create structure */}
      {Array.from({ length: 7 * 5 }).map((_, index) => (
        <div key={index} className={styles.cell}>
          {/* Placeholder for empty cells */}
        </div>
      ))}

      {/* Render lessons in their correct grid positions */}
      {processedLessons.map(({ id, subject, teacher, day, timeSpan }) => (
        <div
          key={id}
          className={styles.cell}
          style={{
            gridColumnStart: day, // Position by day (1-7)
            gridRowStart: timeSpan, // Position by time-span (1-5)
            backgroundColor: "#0078D4", // Fluent primary color
            color: "white",
          }}
        >
          <Lesson subject={subject} teacher={teacher} />
        </div>
      ))}
    </div>
  );
};

export default Timetable;
