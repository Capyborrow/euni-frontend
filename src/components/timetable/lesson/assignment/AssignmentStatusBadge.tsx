import { Tooltip } from "@fluentui/react-components";
import {
  AssignmentStatusEnum,
  assignmentStatusMap,
} from "../../../../types/lesson";
import { StatusBadge } from "../../../enhanced/StatusBadge";

interface AssignmentBadgeProps {
  assignmentStatus?: AssignmentStatusEnum;
}

const AssignmentStatusBadge = ({
  assignmentStatus = AssignmentStatusEnum.None,
}: AssignmentBadgeProps) => {
  return (
    <Tooltip
      content={assignmentStatusMap[assignmentStatus].tooltip!}
      relationship="description"
      showDelay={500}
      withArrow
    >
      <StatusBadge status={assignmentStatusMap[assignmentStatus].status!} />
    </Tooltip>
  );
};

export default AssignmentStatusBadge;
