import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  ProgressBar,
  Tooltip,
} from "@fluentui/react-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AttachmentFile, AttachmentFileTypeEnum } from "../../types/lesson";
import { Document20Regular } from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";

interface AttachmentTagProps {
  attachment: AttachmentFile;
  fileType: AttachmentFileTypeEnum;
  disabled?: boolean;
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
  progress?: number;
}

const useStyles = makeStyles({
  tag: {
    position: "relative",
  },
  tagName: {
    position: "relative",
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0,
    "& > span": {
      maxWidth: "6rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  progress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    "& > div": {
      borderRadius: 0,
    },
  },
});

const AttachmentFileTag = ({
  attachment,
  fileType,
  disabled = false,
  dismissible = true,
  onDismiss = () => {},
  progress = 0,
}: AttachmentTagProps) => {
  const axios = useAxiosPrivate();
  const styles = useStyles();

  const handleDownload = async () => {
    const res = await axios.get<Blob>(
      `/AttachmentFile/download/${fileType}/${attachment.id}`,
      { responseType: "blob" }
    );
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = attachment.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip content={attachment.fileName} relationship="description">
      <InteractionTag value={attachment.fileName} className={styles.tag}>
        <InteractionTagPrimary
          className={styles.tagName}
          icon={<Document20Regular />}
          onClick={handleDownload}
        >
          {attachment.fileName}
        </InteractionTagPrimary>
        {!disabled && dismissible && (
          <InteractionTagSecondary
            aria-label="Dismiss"
            onClick={() => onDismiss(attachment.id)}
          />
        )}
        {progress > 0 && (
          <ProgressBar
            thickness="medium"
            value={progress}
            max={100}
            className={styles.progress}
          />
        )}
      </InteractionTag>
    </Tooltip>
  );
};

export default AttachmentFileTag;
