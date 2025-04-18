import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  Button,
  DialogContent,
} from "@fluentui/react-components";

import AssignmentButton from "./assignment/AssignmentButton";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";
import { LessonProps } from "./Lesson";
import LessonHeader from "./LessonHeader";
import LessonTagGroup from "./LessonTagGroup";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import Assignments from "./assignment/Assignments";
import useAuth from "../../../hooks/useAuth";

const useStyles = makeStyles({
  dialogTitle: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  },
  dialog: {
    padding: "1rem",
  },
  dialogBody: {
    gap: "1rem",
  },
  dialogTitleAction: { display: "flex", gap: "0.5rem", alignItems: "center" },
});

const LessonDialog = ({ lesson }: { lesson: LessonProps }) => {
  const { auth } = useAuth();
  const studentId = auth?.id;
  const styles = useStyles();
  return (
    <div>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <div>
            <AssignmentButton assignmentStatus={lesson.assignmentStatus} />
          </div>
        </DialogTrigger>
        <DialogSurface className={styles.dialog}>
          <DialogBody className={styles.dialogBody}>
            <DialogTitle
              className={styles.dialogTitle}
              action={
                <div className={styles.dialogTitleAction}>
                  <AttendanceStatusBadge
                    attendanceStatus={lesson.attendanceStatus}
                  />
                  <DialogTrigger action="close">
                    <Button
                      appearance="subtle"
                      aria-label="close"
                      icon={<Dismiss24Regular />}
                    />
                  </DialogTrigger>
                </div>
              }
            >
              <LessonHeader
                teacherName={lesson.teacherName}
                teacherAvatar={lesson.teacherAvatar}
                subjectName={lesson.subjectName}
                lessonDate={lesson.date}
              />
              <LessonTagGroup
                room={lesson.room}
                link={lesson.link}
                type={lesson.type}
              />
            </DialogTitle>
            <DialogContent>
              {studentId && (
                <Assignments lessonId={lesson.id} studentId={studentId} />
              )}
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default LessonDialog;
