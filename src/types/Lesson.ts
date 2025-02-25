export enum LessonStatusEnum {
  Attended = "attended",
  Skipped = "skipped",
  Excused = "excused",
  Cancelled = "cancelled",
  Unknown = "unknown",
  Current = "current",
}

export enum LessonTypeEnum {
  Lecture = "Lecture",
  Practice = "Practice",
  Seminar = "Seminar",
  Consultation = "Consultation",
  Exam = "Exam",
}

export enum AssignmentStatusEnum {
  Due = "due",
  Overdue = "overdue",
  Submitted = "submitted",
  Graded = "graded",
  Expired = "expired",
}

export enum CommentStatusEnum {
  Read = "read",
  Unread = "unread",
}

export interface LessonType {
  date?: Date;
  day: number;
  timeSlot: number;
  subject: string;
  teacherName: string;
  teacherAvatar?: string;
  link?: string;
  room?: string;
  type?: LessonTypeEnum;
  lessonStatus: LessonStatusEnum;
  assignmentStatus: AssignmentStatusEnum;
  commentStatus?: CommentStatusEnum;
}
