import {
  makeStyles,
  tokens,
  Body1Strong,
  Body1,
} from "@fluentui/react-components";
import SubmissionGradeBadge from "./SubmissionGradeBadge";
import { AssignmentStatusEnum } from "../../../../../types/lesson";
import { format } from "date-fns";

const useStyles = makeStyles({
  yourWork: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    minWidth: 0,
  },
});

interface SubmissionHeaderProps {
  submittedAt?: Date;
  score?: number;
  maxScore?: number;
  status?: AssignmentStatusEnum;
}

const SubmissionHeader = ({
  submittedAt,
  score,
  maxScore,
  status,
}: SubmissionHeaderProps) => {
  const styles = useStyles();

  return (
    <div className={styles.yourWork}>
      <div className={styles.headerContent}>
        <Body1Strong truncate wrap={false}>
          Your work
        </Body1Strong>
        {submittedAt ? (
          <Body1 truncate wrap={false}>
            • Submitted {format(submittedAt, "MMM dd yyyy")}
          </Body1>
        ) : (
          <Body1 truncate wrap={false}>
            • Unsubmitted
          </Body1>
        )}
      </div>
      <SubmissionGradeBadge score={score} maxScore={maxScore} status={status} />
    </div>
  );
};

export default SubmissionHeader;
