import React from "react";
import Lesson from "../components/LessonTest";
import { Label } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const TimetablePage: React.FC = () => {
  const styles = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div className={styles.label}>
        <Label weight="semibold">Monday</Label>
        <Label>17.01.2024</Label>
      </div>

      <Lesson
        subject="Mathematical logic"
        teacher="Oleksandr Halavai"
        link="https://meet.google.com/lookup/3d2b4"
        status="skipped"
        type="Consultation"
        commentStatus="unread"
      />
      <Lesson
        subject="Propability theory"
        teacher="Vadym Ponomaryov"
        room="311"
        status="attended"
        type="Lecture"
        taskStatus="done"
      />
      <Lesson
        subject="Diffirential equations"
        teacher="Volodymyr Pichkur"
        link="https://meet.google.com/lookup/3d2b4"
        status="cancelled"
        type="Practice"
        taskStatus="overdue"
      />
      <Lesson
        subject="Object Oriented Programming"
        teacher="Yaroslav Tereshchenko"
        room="214"
        taskStatus="due"
      />
    </div>
  );
};

export default TimetablePage;
