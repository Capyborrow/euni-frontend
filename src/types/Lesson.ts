import { StatusBadgeStatus } from "../components/enhanced/StatusBadgeHelpers";

export enum LessonTypeEnum {
  Lecture = "Lecture",
  Practice = "Practice",
  Seminar = "Seminar",
  Consultation = "Consultation",
  Exam = "Exam",
}

export enum AttendanceStatusEnum {
  Attended = "Attended",
  Skipped = "Skipped",
  Excused = "Excused",
  Cancelled = "Cancelled",
  Unknown = "Unknown",
}

export enum AssignmentStatusEnum {
  Due = "Due",
  Overdue = "Overdue",
  Submitted = "Submitted",
  Graded = "Graded",
  Expired = "Expired",
  None = "None",
}

export interface LessonType {
  id: string;
  date: Date;
  subjectName: string;
  teacherName?: string;
  teacherAvatar?: string;
  link?: string;
  room?: string;
  type?: LessonTypeEnum;
  attendanceStatus?: AttendanceStatusEnum;
  assignmentStatus?: AssignmentStatusEnum;
}

export interface AssignmentType {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  createdDate?: Date;
  maxScore?: number;
  attachments?: AttachmentFile[];
  score?: number;
  isSubmittable?: boolean;
  submittedAt?: Date;
  status?: AssignmentStatusEnum;
  submissions?: AttachmentFile[];
}

export interface AttachmentFile {
  id: string;
  fileName: string;
  fileUrl?: string;
}

export enum AttachmentFileTypeEnum {
  Submission = "submission",
  Assignment = "assignment",
}

export interface StatusMetadata {
  status?: StatusBadgeStatus;
  tooltip?: string;
}

export const attendanceStatusMap: Record<AttendanceStatusEnum, StatusMetadata> =
  {
    [AttendanceStatusEnum.Attended]: {
      status: "available-filled",
      tooltip: "You attended this lesson",
    },
    [AttendanceStatusEnum.Skipped]: {
      status: "do-not-disturb-filled",
      tooltip: "You skipped this lesson",
    },
    [AttendanceStatusEnum.Excused]: {
      status: "do-not-disturb",
      tooltip: "You were excused from this lesson",
    },
    [AttendanceStatusEnum.Cancelled]: {
      status: "offline",
      tooltip: "This lesson was cancelled",
    },
    [AttendanceStatusEnum.Unknown]: { status: "unknown", tooltip: "Status" },
  };

export const assignmentStatusMap: Record<AssignmentStatusEnum, StatusMetadata> =
  {
    [AssignmentStatusEnum.Due]: {
      status: "away",
      tooltip: "Assignment due",
    },
    [AssignmentStatusEnum.Overdue]: {
      status: "do-not-disturb",
      tooltip: "Assignment overdue",
    },
    [AssignmentStatusEnum.Submitted]: {
      status: "available",
      tooltip: "Assignment submitted",
    },
    [AssignmentStatusEnum.Graded]: {
      status: "available-filled",
      tooltip: "Assignment graded",
    },
    [AssignmentStatusEnum.Expired]: {
      status: "do-not-disturb-filled",
      tooltip: "Assignment expired",
    },
    [AssignmentStatusEnum.None]: {
      status: "unknown",
      tooltip: "No assignment",
    },
  };
