import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Card,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import Assignment from "./Assignment";
import AssignmentHeader, {
  AssignmentSkeleton,
  ErrorAssignment,
  NoAssignments,
} from "./AssignmentHeader";
import { AssignmentType } from "../../../../types/lesson";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const useStyles = makeStyles({
  accordion: {
    display: "flex",
    gap: tokens.spacingVerticalS,
    flexDirection: "column",
  },
  card: {
    boxShadow: "none",
    padding: "0rem",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  accordionPanel: {
    margin: 0,
  },
  feedback: {
    margin: tokens.spacingVerticalS,
    textAlign: "center",
    width: "100%",
  },
});

type AssignmentsProps = {
  lessonId: string;
  studentId: string;
};

// const mockAssignments = [
//   {
//     id: "1",
//     title: "Assignment 1",
//     description: "This is the first assignment",
//     createdDate: new Date(),
//     attachments: [
//       { id: "1", fileName: "file1.pdf" },
//       { id: "2", fileName: "file2.docx" },
//     ],
//     status: AssignmentStatusEnum.Due,
//     submissions: [
//       { id: "1", fileName: "file1.pdf" },
//       { id: "2", fileName: "file2.docx" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Assignment 2",
//     description: "This is the second assignment",
//     createdDate: new Date(),
//     status: AssignmentStatusEnum.Overdue,
//   },
//   {
//     id: "3",
//     title: "Assignment 3",
//     description: "This is the third assignment",
//     createdDate: new Date(),
//     status: AssignmentStatusEnum.Expired,
//   },
//   {
//     id: "4",
//     title: "Assignment 4",
//     description: "This is the fourth assignment",
//     createdDate: new Date(),
//     status: AssignmentStatusEnum.Submitted,
//     submittedAt: new Date(),
//   },
//   {
//     id: "5",
//     title: "Assignment 5",
//     description: "This is the fifth assignment",
//     createdDate: new Date(),
//     status: AssignmentStatusEnum.Graded,
//     submittedAt: new Date(),
//     submissions: [
//       { id: "1", fileName: "file4.pdf" },
//       { id: "2", fileName: "file5.docx" },
//     ],
//   },
// ];

const Assignments = ({ lessonId, studentId }: AssignmentsProps) => {
  const styles = useStyles();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: assignments,
    isLoading,
    error,
  } = useQuery<AssignmentType[]>(
    ["assignments", lessonId, studentId],
    async () => {
      const response = await axiosPrivate.get(
        `/Lesson/getAssignmentsForLesson/${lessonId}/${studentId}`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.data.map((assignment: any) => ({
        id: assignment.id,
        lessonId: lessonId,
        title: assignment.name,
        description: assignment.description,
        createdDate: assignment.createdDate
          ? new Date(assignment.createdDate)
          : undefined,
        maxScore: assignment.maxScore,
        attachments: assignment.attachments,
        score: assignment.studentAssignment?.score,
        isSubmittable: assignment.isSubmittable,
        submittedAt: assignment.studentAssignment?.submittedAt
          ? new Date(assignment.studentAssignment.submittedAt)
          : undefined,
        status: assignment.studentAssignment?.status,
        submissions: assignment.studentAssignment?.submissions,
      }));
    },
    {
      enabled: !!lessonId && !!studentId,
    }
  );

  if (isLoading) {
    return <AssignmentSkeleton />;
  }

  if (error) {
    return <ErrorAssignment />;
  }

  if (!assignments || assignments.length === 0) {
    return <NoAssignments />;
  }

  return (
    <div>
      <Accordion
        defaultOpenItems={assignments[0].id}
        className={styles.accordion}
      >
        {assignments.map((assignment) => (
          <AccordionItem key={assignment.id} value={assignment.id}>
            <Card appearance="filled-alternative" className={styles.card}>
              <AccordionHeader
                expandIcon={assignments.length <= 1 ? null : undefined}
              >
                <AssignmentHeader
                  title={assignment.title}
                  createdDate={assignment.createdDate!}
                  status={assignment.status}
                  isSubmittable={assignment.isSubmittable}
                />
              </AccordionHeader>
            </Card>
            <AccordionPanel className={styles.accordionPanel}>
              <Assignment assignment={assignment} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Assignments;
