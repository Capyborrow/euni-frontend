import { Tooltip } from "@fluentui/react-components";
import {
  AttendanceStatusEnum,
  attendanceStatusMap,
} from "../../../types/lesson";
import { StatusBadge } from "../../enhanced/StatusBadge";

interface AttendanceBadgeProps {
  attendanceStatus?: AttendanceStatusEnum;
}

const AttendanceStatusBadge = ({
  attendanceStatus = AttendanceStatusEnum.Unknown,
}: AttendanceBadgeProps) => {
  return (
    <Tooltip
      content={attendanceStatusMap[attendanceStatus].tooltip!}
      relationship="description"
      showDelay={500}
      withArrow
    >
      <StatusBadge status={attendanceStatusMap[attendanceStatus].status!} />
    </Tooltip>
  );
};

export default AttendanceStatusBadge;
