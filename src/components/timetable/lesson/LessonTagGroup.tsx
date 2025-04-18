import {
  Caption1Strong,
  InteractionTag,
  InteractionTagPrimary,
  Tag,
  TagGroup,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Link20Filled } from "@fluentui/react-icons";
import { Link } from "../../enhanced/Link";

interface LessonTagGroupProps {
  room?: string;
  link?: string;
  type?: string;
}

const useStyles = makeStyles({
  tagGroup: {
    gap: tokens.spacingHorizontalS,
  },
  tag: {
    minWidth: 0,
    "& > span": {
      minWidth: 0,
    },
  },
  tagText: {
    display: "block",
    minWidth: 0,
  },
});

const LessonTagGroup = ({ room, link, type }: LessonTagGroupProps) => {
  const styles = useStyles();

  return (
    <TagGroup appearance="brand" size="extra-small" className={styles.tagGroup}>
      {room && (
        <Tag>
          <Caption1Strong truncate wrap={false}>
            {room}
          </Caption1Strong>
        </Tag>
      )}

      {link && (
        <InteractionTag>
          <InteractionTagPrimary>
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lesson link"
              title="Open lesson link"
            >
              <Link20Filled />
            </Link>
          </InteractionTagPrimary>
        </InteractionTag>
      )}

      {type && (
        <Tag className={styles.tag}>
          <Caption1Strong truncate wrap={false} className={styles.tagText}>
            {type}
          </Caption1Strong>
        </Tag>
      )}
    </TagGroup>
  );
};

export default LessonTagGroup;
