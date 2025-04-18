import { Body1, Card, Divider } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { AssignmentType } from "../../../../types/lesson";
import AssignmentAttachments from "./AssignmentAttachments";
import Submission from "./submissions/Submission";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    paddingTop: "0",
  },
});

type AssignmentProps = AssignmentType & {
  className?: string;
};

const Assignment = ({ assignment }: { assignment: AssignmentProps }) => {
  const styles = useStyles();

  return (
    <Card appearance="filled-alternative" className={styles.root}>
      <Body1>{assignment.description}</Body1>
      <AssignmentAttachments attachments={assignment.attachments} />
      {assignment.isSubmittable && (
        <>
          <Divider />
          <Submission assignment={assignment} />
        </>
      )}
    </Card>
  );
};

export default Assignment;
