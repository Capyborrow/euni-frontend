import ButtonWithBadge from "../../../enhanced/ButtonWithBadge";
import { Backpack24Regular } from "@fluentui/react-icons";
import { getStatusBadgeProps } from "../../../enhanced/StatusBadgeHelpers";
import {
  AssignmentStatusEnum,
  assignmentStatusMap,
} from "../../../../types/lesson";
import { Tooltip } from "@fluentui/react-components";

interface AssignmentButtonProps {
  assignmentStatus?: AssignmentStatusEnum;
}

const AssignmentButton = ({ assignmentStatus }: AssignmentButtonProps) => {
  return (
    <Tooltip
      content={
        assignmentStatus
          ? assignmentStatusMap[assignmentStatus].tooltip!
          : "You have no assignments"
      }
      relationship="description"
      showDelay={500}
      withArrow
    >
      <ButtonWithBadge
        icon={<Backpack24Regular />}
        badgeProps={
          assignmentStatus &&
          getStatusBadgeProps(assignmentStatusMap[assignmentStatus].status!, {
            size: "extra-small",
          })
        }
      />
    </Tooltip>
  );
};

export default AssignmentButton;
