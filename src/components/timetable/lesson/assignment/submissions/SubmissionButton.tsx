import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, makeStyles } from "@fluentui/react-components";
import {
  Checkmark20Filled,
  Dismiss20Filled,
  Send20Filled,
} from "@fluentui/react-icons";
import {
  AssignmentStatusEnum,
  AssignmentType,
} from "../../../../../types/lesson";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

const useStyles = makeStyles({
  footerActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

interface SubmissionButtonProps {
  lessonId: string;
  studentId: string;
  assignmentId: string;
  status?: AssignmentStatusEnum;
  hasSubmissions?: boolean;
}

export default function SubmissionButton({
  lessonId,
  studentId,
  assignmentId,
  status,
  hasSubmissions = false,
}: SubmissionButtonProps) {
  const styles = useStyles();
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const submitMutation = useMutation(
    () =>
      axios.put(`/Assignment/SubmitAssignment/${studentId}/${assignmentId}`),
    {
      onSuccess: () => {
        queryClient.setQueryData<AssignmentType[]>(
          ["assignments", lessonId, studentId],
          (list) =>
            list?.map((a) =>
              a.id === assignmentId
                ? {
                    ...a,
                    status: AssignmentStatusEnum.Submitted,
                    submittedAt: new Date(),
                  }
                : a
            )
        );
      },
    }
  );

  const cancelMutation = useMutation(
    () =>
      axios.put(
        `/Assignment/CancelAssignmentSubmission/${studentId}/${assignmentId}`
      ),
    {
      onSuccess: () => {
        queryClient.setQueryData<AssignmentType[]>(
          ["assignments", lessonId, studentId],
          (list) =>
            list?.map((a) =>
              a.id === assignmentId
                ? {
                    ...a,
                    status: AssignmentStatusEnum.Due,
                    submittedAt: undefined,
                  }
                : a
            )
        );
      },
    }
  );

  const isLoading = submitMutation.isLoading || cancelMutation.isLoading;

  return (
    <div className={styles.footerActions}>
      {(status === AssignmentStatusEnum.Submitted ||
        status === AssignmentStatusEnum.Graded) && (
        <Button
          appearance="primary"
          icon={<Dismiss20Filled />}
          onClick={() => cancelMutation.mutate()}
          disabled={isLoading}
        >
          {isLoading ? "Cancelling…" : "Cancel submission"}
        </Button>
      )}

      {status !== AssignmentStatusEnum.Submitted &&
        status !== AssignmentStatusEnum.Graded &&
        hasSubmissions && (
          <Button
            appearance="primary"
            icon={<Send20Filled />}
            onClick={() => submitMutation.mutate()}
            disabled={isLoading || status === AssignmentStatusEnum.Expired}
          >
            {isLoading ? "Submitting…" : "Submit"}
          </Button>
        )}

      {status !== AssignmentStatusEnum.Submitted &&
        status !== AssignmentStatusEnum.Graded &&
        !hasSubmissions && (
          <Button
            appearance="primary"
            icon={<Checkmark20Filled />}
            onClick={() => submitMutation.mutate()}
            disabled={isLoading || status === AssignmentStatusEnum.Expired}
          >
            {isLoading ? "Marking…" : "Mark as done"}
          </Button>
        )}
    </div>
  );
}
