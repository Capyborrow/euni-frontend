import { makeStyles } from "@fluentui/react-components";
import Lesson from "../components/LessonTest";
const useStyles = makeStyles({
  root: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minHeight: "100vh",
  },
});

const Timetable = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Lesson
        subject="Mathematical logic"
        teacher="Oleksandr Halavai"
        room="311"
        type="Practice"
        status="attended"
        taskStatus="done"
      />
      <Lesson
        subject="Probability theory"
        teacher="Vadym Ponomaryov"
        link="#"
        type="Lecture"
        status="skipped"
        taskStatus="overdue"
        commentStatus="unread"
      />
      <Lesson
        subject="Diffrerential equations"
        teacher="Volodymyr Pichkur"
        room="410"
        type="Consultation"
        status="cancelled"
        commentStatus="unread"
      />
      <Lesson
        subject="Object-oriented programming"
        teacher="Yaroslav Tereshchenko"
        link="#"
        type="Practice"
        status="unknown"
        taskStatus="due"
      />
    </div>
  );
};

export default Timetable;
