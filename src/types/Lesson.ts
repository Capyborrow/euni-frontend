export enum LessonStatusEnum {
  Attended = "Attended",
  Skipped = "Skipped",
  Excused = "Excused",
  Cancelled = "Cancelled",
  Unknown = "Unknown",
}

export enum LessonTypeEnum {
  Lecture = "Lecture",
  Practice = "Practice",
  Seminar = "Seminar",
  Consultation = "Consultation",
  Exam = "Exam",
}

export enum AssignmentStatusEnum {
  Due = "Due",
  Overdue = "Overdue",
  Submitted = "Submitted",
  Graded = "Graded",
  Expired = "Expired",
}

export enum CommentStatusEnum {
  Read = "read",
  Unread = "unread",
}

export interface LessonType {
  date: Date;
  subjectName: string;
  teacherName: string;
  teacherAvatar?: string;
  link?: string;
  room?: string;
  type?: LessonTypeEnum;
  lessonStatus: LessonStatusEnum;
  assignmentStatus: AssignmentStatusEnum;
  commentStatus?: CommentStatusEnum;
}
