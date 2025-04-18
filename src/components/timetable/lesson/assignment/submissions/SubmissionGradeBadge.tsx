import { Badge, BadgeProps } from "@fluentui/react-components";
import { AssignmentStatusEnum } from "../../../../../types/lesson";

interface SubmissionGradeBadgeProps extends BadgeProps {
  score?: number;
  maxScore?: number;
  status?: AssignmentStatusEnum;
}

const SubmissionGradeBadge = ({
  score = 0,
  maxScore = 100,
  status,
  ...badgeProps
}: SubmissionGradeBadgeProps) => {
  return (
    <Badge appearance="tint" size="large" shape="rounded" {...badgeProps}>
      {status === AssignmentStatusEnum.Graded ||
      status == AssignmentStatusEnum.Expired
        ? score
          ? score
          : "-"
        : "-"}
      {" / "}
      {maxScore}
    </Badge>
  );
};

export default SubmissionGradeBadge;
