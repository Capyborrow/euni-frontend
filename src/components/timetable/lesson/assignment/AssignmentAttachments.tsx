import { TagGroup, makeStyles } from "@fluentui/react-components";
import {
  AttachmentFile,
  AttachmentFileTypeEnum,
} from "../../../../types/lesson";
import AttachmentFileTag from "../../../enhanced/AttachmentFileTag";

const useStyles = makeStyles({
  tagGroup: {
    flexWrap: "wrap",
    gap: "0.5rem",
  },
});

interface AssignmentAttachmentsProps {
  attachments?: AttachmentFile[];
}

const AssignmentAttachments = ({ attachments }: AssignmentAttachmentsProps) => {
  const styles = useStyles();

  return (
    <TagGroup size="small" appearance="brand" className={styles.tagGroup}>
      {attachments?.map((attachment) => (
        <AttachmentFileTag
          key={attachment.id}
          attachment={attachment}
          fileType={AttachmentFileTypeEnum.Assignment}
          dismissible={false}
        />
      ))}
    </TagGroup>
  );
};

export default AssignmentAttachments;
