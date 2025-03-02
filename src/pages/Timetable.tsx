import Timetable from "../components/Timetable";
import {
  LessonStatusEnum,
  AssignmentStatusEnum,
  CommentStatusEnum,
  LessonTypeEnum,
} from "../types/Lesson";

const lessons = [
  {
    day: 0,
    timeSlot: 0,
    subject: "Mathematical logic",
    teacherName: "Oleksandr Halavai",
    room: "311",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Excused,
    assignmentStatus: AssignmentStatusEnum.Graded,
  },
  {
    day: 0,
    timeSlot: 1,
    subject: "Probability theory",
    teacherName: "Vadym Ponomaryov",
    link: "#",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Skipped,
    assignmentStatus: AssignmentStatusEnum.Overdue,
    commentStatus: CommentStatusEnum.Unread,
  },
  {
    day: 1,
    timeSlot: 2,
    subject: "Differential equations",
    teacherName: "Volodymyr Pichkur",
    room: "410",
    type: LessonTypeEnum.Consultation,
    lessonStatus: LessonStatusEnum.Current,
    assignmentStatus: AssignmentStatusEnum.Submitted,
    commentStatus: CommentStatusEnum.Unread,
  },
  {
    day: 2,
    timeSlot: 3,
    subject: "Object-oriented programming",
    teacherName: "Yaroslav Tereshchenko",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Expired,
  },
  {
    day: 3,
    timeSlot: 4,
    subject: "English for professional use",
    teacherName: "Oleksandr Kalenchenko",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 3,
    timeSlot: 1,
    subject: "Hello",
    teacherName: "Oleksandr Kalenchenko",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 0,
    timeSlot: 2,
    subject: "Linear Algebra",
    teacherName: "Iryna Koval",
    room: "207",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Attended,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 1,
    timeSlot: 0,
    subject: "Computer Networks",
    teacherName: "Andriy Melnyk",
    room: "502",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Skipped,
    assignmentStatus: AssignmentStatusEnum.Overdue,
  },
  {
    day: 1,
    timeSlot: 3,
    subject: "Databases",
    teacherName: "Svitlana Holub",
    room: "101",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Cancelled,
    assignmentStatus: AssignmentStatusEnum.Submitted,
  },
  {
    day: 2,
    timeSlot: 1,
    subject: "Web Development",
    teacherName: "Oleh Marchenko",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Attended,
    assignmentStatus: AssignmentStatusEnum.Graded,
  },
  {
    day: 2,
    timeSlot: 4,
    subject: "Discrete Mathematics",
    teacherName: "Natalia Sokolova",
    room: "309",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 3,
    timeSlot: 0,
    subject: "Physics",
    teacherName: "Volodymyr Hrytsenko",
    room: "120",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Attended,
    assignmentStatus: AssignmentStatusEnum.Submitted,
  },
  {
    day: 3,
    timeSlot: 2,
    subject: "Artificial Intelligence",
    teacherName: "Kateryna Lys",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Skipped,
    assignmentStatus: AssignmentStatusEnum.Expired,
  },
  {
    day: 4,
    timeSlot: 0,
    subject: "Cybersecurity",
    teacherName: "Ivan Bondarenko",
    link: "#",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Graded,
    commentStatus: CommentStatusEnum.Unread,
  },
  {
    day: 4,
    timeSlot: 1,
    subject: "Computer Graphics",
    teacherName: "Olha Petrenko",
    room: "215",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Attended,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 4,
    timeSlot: 3,
    subject: "Data Structures",
    teacherName: "Pavlo Zhuk",
    link: "#",
    type: LessonTypeEnum.Consultation,
    lessonStatus: LessonStatusEnum.Unknown,
    assignmentStatus: AssignmentStatusEnum.Submitted,
  },
  {
    day: 5,
    timeSlot: 0,
    subject: "Software Engineering",
    teacherName: "Serhiy Hladkyi",
    room: "412",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Attended,
    assignmentStatus: AssignmentStatusEnum.Overdue,
  },
  {
    day: 5,
    timeSlot: 2,
    subject: "Game Development",
    teacherName: "Mykhailo Kravets",
    link: "#",
    type: LessonTypeEnum.Practice,
    lessonStatus: LessonStatusEnum.Skipped,
    assignmentStatus: AssignmentStatusEnum.Due,
  },
  {
    day: 5,
    timeSlot: 4,
    subject: "Embedded Systems",
    teacherName: "Anton Bereza",
    room: "303",
    type: LessonTypeEnum.Lecture,
    lessonStatus: LessonStatusEnum.Cancelled,
    assignmentStatus: AssignmentStatusEnum.Submitted,
  },
];

const TimetablePage = () => {
  return <Timetable lessons={lessons} />;
};
export default TimetablePage;
