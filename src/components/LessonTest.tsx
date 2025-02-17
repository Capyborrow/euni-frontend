import {
  Avatar,
  Card,
  CardHeader,
  CardFooter,
  Link,
  Tag,
  PresenceBadge,
  Button,
  Tooltip,
  Caption1Strong,
  Caption1,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
} from "@fluentui/react-components";
import {
  Link20Filled,
  Comment20Regular,
  Backpack20Regular,
  AlertRegular,
} from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";

type LessonStatus = "attended" | "skipped" | "cancelled" | "unknown";
type TaskStatus = "done" | "overdue" | "due";
type CommentStatus = "unread";

interface StatusMetadata {
  icon: "available" | "do-not-disturb" | "offline" | "away" | "unknown";
  tooltip: string;
}

const lessonStatusMap: Record<LessonStatus, StatusMetadata> = {
  attended: { icon: "available", tooltip: "You attended this lesson" },
  skipped: { icon: "do-not-disturb", tooltip: "You skipped this lesson" },
  cancelled: { icon: "offline", tooltip: "This lesson was cancelled" },
  unknown: { icon: "unknown", tooltip: "Status" },
};

const taskStatusMap: Record<TaskStatus, StatusMetadata> = {
  due: { icon: "away", tooltip: "You have tasks due soon" },
  overdue: { icon: "do-not-disturb", tooltip: "You have tasks overdue" },
  done: {
    icon: "available",
    tooltip: "You have completed all tasks",
  },
};

interface LessonProps {
  subject: string;
  teacher: string;
  link?: string;
  room?: string;
  type?: string;
  status?: LessonStatus;
  taskStatus?: TaskStatus;
  commentStatus?: CommentStatus;
}
const useStyles = makeStyles({
  root: {
    width: "12rem",
    gap: "0.5rem",
    padding: "0.5rem",
  },
  cardFooter: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  cardHeader: {
    gridTemplateColumns: "min-content minmax(0, 1fr) min-content",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    height: "100%",
  },
  avatar: {
    overflow: "hidden",
  },
  type: {
    width: "100%",
  },
});

const Lesson = ({
  subject,
  teacher,
  link,
  room,
  type,
  status = "unknown",
  taskStatus,
  commentStatus,
}: LessonProps) => {
  const styles = useStyles();

  return (
    <Card size="medium" className={styles.root}>
      <CardHeader
        className={styles.cardHeader}
        image={<Avatar />}
        header={
          <Caption1Strong truncate wrap={false}>
            {subject}
          </Caption1Strong>
        }
        description={
          <Caption1 truncate wrap={false}>
            {teacher}
          </Caption1>
        }
      />
      <TagGroup appearance="brand" size="extra-small">
        {room && (
          <Tag>
            <Caption1Strong>{room}</Caption1Strong>
          </Tag>
        )}
        {link && (
          <InteractionTag>
            <InteractionTagPrimary>
              <Link href={link}>
                <Link20Filled />
              </Link>
            </InteractionTagPrimary>
          </InteractionTag>
        )}
        {type && <Tag>{type}</Tag>}
      </TagGroup>
      <CardFooter className={styles.cardFooter}>
        <Tooltip
          content={taskStatus ? taskStatusMap[taskStatus].tooltip : "Tasks"}
          relationship="description"
          showDelay={1000}
        >
          {taskStatus ? (
            <Avatar
              icon={<Button icon={<Backpack20Regular />} />}
              badge={{ status: taskStatusMap[taskStatus].icon }}
              shape="square"
              size={24}
            />
          ) : (
            <Avatar
              className={styles.avatar}
              icon={<Button icon={<Backpack20Regular />} />}
              shape="square"
              size={24}
            />
          )}
        </Tooltip>
        <Tooltip
          content={
            commentStatus === "unread" ? "You have comments unread" : "Comments"
          }
          relationship="description"
          showDelay={1000}
        >
          {commentStatus === "unread" ? (
            <Avatar
              icon={<Button icon={<Comment20Regular />} />}
              badge={{ status: "busy" }}
              shape="square"
              size={24}
            />
          ) : (
            <Avatar
              className={styles.avatar}
              icon={<Button icon={<Comment20Regular />} />}
              shape="square"
              size={24}
            />
          )}
        </Tooltip>

        <Tooltip
          content="Notify me"
          relationship="description"
          showDelay={1000}
        >
          <Button appearance="subtle" size="small" icon={<AlertRegular />} />
        </Tooltip>

        <div style={{ width: "100%" }} />
        <Tooltip
          content={lessonStatusMap[status].tooltip}
          relationship="description"
          showDelay={1000}
        >
          <PresenceBadge
            size="medium"
            status={lessonStatusMap[status].icon ?? "unknown"}
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default Lesson;
