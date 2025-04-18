import {
  Body1,
  Body1Strong,
  Card,
  CardHeader,
  makeStyles,
  PresenceBadge,
  SkeletonItem,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import { format } from "date-fns";
import AssignmentStatusBadge from "./AssignmentStatusBadge";
import { AssignmentStatusEnum } from "../../../../types/lesson";
import { Info20Filled } from "@fluentui/react-icons";
import { StatusBadge } from "../../../enhanced/StatusBadge";

const useStyles = makeStyles({
  cardHeader: {
    gridAutoColumns: "min-content minmax(0, 1fr) min-content",
    flex: 1,
    "&>div": {
      display: "flex",
      alignItems: "center",
    },
  },
  headerContent: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    minWidth: 0,
  },
  skeleton: {
    width: "12rem",
  },
  card: {
    boxShadow: "none",

    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

interface AssignmentHeaderProps {
  title?: string;
  createdDate?: Date;
  status?: AssignmentStatusEnum;
  isSubmittable?: boolean;
}

const AssignmentHeader = ({
  title = "Untitled Assignment",
  createdDate,
  status,
  isSubmittable,
}: AssignmentHeaderProps) => {
  const styles = useStyles();

  return (
    <CardHeader
      className={styles.cardHeader}
      header={
        <div className={styles.headerContent}>
          <Body1Strong truncate wrap={false}>
            {title}
          </Body1Strong>
          {createdDate && (
            <Body1 truncate wrap={false}>
              • {format(createdDate, "MMM dd yyyy")}
            </Body1>
          )}
        </div>
      }
      action={
        isSubmittable ? (
          <AssignmentStatusBadge assignmentStatus={status} />
        ) : (
          <Tooltip content="Information" relationship="label">
            <PresenceBadge
              style={{ width: "16px", height: "16px" }}
              icon={<Info20Filled color={tokens.colorBrandForeground1} />}
            />
          </Tooltip>
        )
      }
    />
  );
};

export default AssignmentHeader;

export const AssignmentSkeleton = () => {
  const styles = useStyles();
  return (
    <Card appearance="filled-alternative" className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        header={
          <div className={styles.headerContent}>
            <SkeletonItem
              shape="rectangle"
              size={20}
              className={styles.skeleton}
            />
          </div>
        }
        action={<SkeletonItem shape="circle" size={16} />}
      />
    </Card>
  );
};

export const NoAssignments = () => {
  const styles = useStyles();
  return (
    <Card appearance="filled-alternative" className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        header={
          <div className={styles.headerContent}>
            <Body1Strong truncate wrap={false}>
              There are no assignments for this lesson
            </Body1Strong>
          </div>
        }
        action={<StatusBadge status="unknown" />}
      />
    </Card>
  );
};

export const ErrorAssignment = () => {
  const styles = useStyles();
  return (
    <Card appearance="filled-alternative" className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        header={
          <div className={styles.headerContent}>
            <Body1Strong truncate wrap={false}>
              There was an error fetching the assignments
            </Body1Strong>
          </div>
        }
        action={<StatusBadge status="busy-filled" />}
      />
    </Card>
  );
};
