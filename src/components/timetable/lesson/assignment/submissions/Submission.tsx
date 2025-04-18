import { CardFooter, makeStyles } from "@fluentui/react-components";
import { AssignmentType } from "../../../../../types/lesson";
import SubmissionAttachments from "./SubmissionAttachments";
import SubmissionHeader from "./SubmissionHeader";
import useAuth from "../../../../../hooks/useAuth";
import SubmissionButton from "./SubmissionButton";

const useStyles = makeStyles({
  footer: {
    display: "flex",
    flexDirection: "column",
  },
});

const Submission = ({ assignment }: { assignment: AssignmentType }) => {
  const styles = useStyles();
  const { auth } = useAuth();
  if (!auth) return null;
  return (
    <CardFooter className={styles.footer}>
      <SubmissionHeader
        submittedAt={assignment.submittedAt}
        score={assignment.score}
        maxScore={assignment.maxScore}
        status={assignment.status}
      />
      <SubmissionAttachments
        attachments={assignment.submissions}
        status={assignment.status}
        studentId={auth.id}
        assignmentId={assignment.id}
        lessonId={assignment.lessonId}
      />
      <SubmissionButton
        status={assignment.status}
        hasSubmissions={Boolean(assignment?.submissions?.length)}
        studentId={auth.id}
        assignmentId={assignment.id}
        lessonId={assignment.lessonId}
      />
    </CardFooter>
  );
};

export default Submission;
