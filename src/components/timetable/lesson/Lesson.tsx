import {
  Button,
  Card,
  CardFooter,
  mergeClasses,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { LessonType } from "../../../types/lesson";
import LessonHeader from "./LessonHeader";
import LessonTagGroup from "./LessonTagGroup";
import LessonDialog from "./LessonDialog";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

export interface LessonProps extends LessonType {
  className?: string;
}

const useStyles = makeStyles({
  lesson: {
    minWidth: "10rem",
    width: "100%",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const Lesson = ({ lesson }: { lesson: LessonProps }) => {
  const styles = useStyles();

  return (
    <Card
      size="medium"
      className={mergeClasses(styles.lesson, lesson.className)}
    >
      <LessonHeader
        teacherName={lesson.teacherName}
        teacherAvatar={lesson.teacherAvatar}
        subjectName={lesson.subjectName}
      />
      <LessonTagGroup
        room={lesson.room}
        link={lesson.link}
        type={lesson.type}
      />
      <CardFooter className={styles.cardFooter}>
        <LessonDialog lesson={lesson} />
        <Button
          size="medium"
          appearance="transparent"
          icon={
            <AttendanceStatusBadge attendanceStatus={lesson.attendanceStatus} />
          }
        />
      </CardFooter>
    </Card>
  );
};

export default Lesson;
