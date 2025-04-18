import * as React from "react";
import { Button, TagGroup, makeStyles } from "@fluentui/react-components";
import { DocumentAdd16Regular } from "@fluentui/react-icons";
import {
  AttachmentFile,
  AssignmentStatusEnum,
  AttachmentFileTypeEnum,
  AssignmentType,
} from "../../../../../types/lesson";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import AttachmentFileTag from "../../../../enhanced/AttachmentFileTag";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useStyles = makeStyles({
  tagGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  hiddenInput: {
    display: "none",
  },
});

type AttachmentWithProgress = AttachmentFile & { progress?: number };

interface SubmissionAttachmentsProps {
  lessonId: string;
  attachments?: AttachmentFile[];
  status?: AssignmentStatusEnum;
  studentId: string;
  assignmentId: string;
}

const SubmissionAttachments: React.FC<SubmissionAttachmentsProps> = ({
  lessonId,
  attachments: initialAttachments = [],
  status,
  studentId,
  assignmentId,
}) => {
  const styles = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const [attachments, setAttachments] = React.useState<
    AttachmentWithProgress[]
  >(initialAttachments.map((a) => ({ ...a })));
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const isDisabled =
    status === AssignmentStatusEnum.Submitted ||
    status === AssignmentStatusEnum.Graded ||
    status === AssignmentStatusEnum.Expired;

  const removeMutation = useMutation(
    (id: string) =>
      axiosPrivate.delete(`/AttachmentFile/delete/submission/${id}`),
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries(["assignments", lessonId, studentId]);
        const prevAssignments = queryClient.getQueryData<AssignmentType[]>([
          "assignments",
          lessonId,
          studentId,
        ]);
        const prevAttachments = attachments;
        setAttachments((current) => current.filter((att) => att.id !== id));
        queryClient.setQueryData<AssignmentType[]>(
          ["assignments", lessonId, studentId],
          (old) =>
            old?.map((a) =>
              a.id === assignmentId
                ? {
                    ...a,
                    submissions: a.submissions?.filter((s) => s.id !== id),
                  }
                : a
            ) ?? []
        );
        return { prevAssignments, prevAttachments };
      },
      onError: (_err, _id, context) => {
        if (context?.prevAttachments) {
          setAttachments(context.prevAttachments);
        }
        if (context?.prevAssignments) {
          queryClient.setQueryData(
            ["assignments", lessonId, studentId],
            context.prevAssignments
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["assignments", lessonId, studentId]);
      },
    }
  );

  const uploadMutation = useMutation(
    async (args: { file: File; tempId: string }) => {
      const { file, tempId } = args;
      const formData = new FormData();
      formData.append("file", file);
      return axiosPrivate.post<AttachmentFile>(
        `/AttachmentFile/${studentId}/${assignmentId}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const total = e.total ?? e.loaded;
            const percent = Math.round((e.loaded * 100) / total);
            setAttachments((current) =>
              current.map((att) =>
                att.id === tempId ? { ...att, progress: percent } : att
              )
            );
          },
        }
      );
    },
    {
      onSuccess: (response, { tempId }) => {
        const uploaded = response.data;
        setAttachments((current) =>
          current.map((att) => (att.id === tempId ? { ...uploaded } : att))
        );
        queryClient.setQueryData<AssignmentType[]>(
          ["assignments", lessonId, studentId],
          (old) =>
            old?.map((a) =>
              a.id === assignmentId
                ? { ...a, submissions: [...(a.submissions ?? []), uploaded] }
                : a
            ) ?? []
        );
      },
      onError: (_err, { tempId }) => {
        setAttachments((current) => current.filter((att) => att.id !== tempId));
      },
      onSettled: () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    }
  );

  const handleRemoveAttachment = (id: string) => {
    removeMutation.mutate(id);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const tempId = `temp-${Date.now()}-${file.name}`;
    const tempAttachment: AttachmentWithProgress = {
      id: tempId,
      fileName: file.name,
      progress: 0,
    };

    setAttachments((current) => [...current, tempAttachment]);
    uploadMutation.mutate({ file, tempId });
  };

  return (
    <>
      <TagGroup size="small" appearance="brand" className={styles.tagGroup}>
        {attachments.map((att) => (
          <AttachmentFileTag
            key={att.id}
            attachment={att}
            fileType={AttachmentFileTypeEnum.Submission}
            disabled={isDisabled}
            onDismiss={handleRemoveAttachment}
            progress={att.progress}
          />
        ))}
        <Button
          size="small"
          icon={<DocumentAdd16Regular />}
          disabled={isDisabled}
          onClick={() => fileInputRef.current?.click()}
        >
          Attach file
        </Button>
      </TagGroup>

      <input
        type="file"
        ref={fileInputRef}
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />
    </>
  );
};

export default SubmissionAttachments;
