import {
  Avatar,
  Badge,
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
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import {
  Link20Filled,
  MoreHorizontal20Regular,
  Comment20Regular,
  Backpack20Regular,
  WarningRegular,
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
    width: "15rem",
    gap: "0.5rem",
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
    <Card className={styles.root}>
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
        action={
          <Menu positioning={{ autoSize: true }}>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="transparent"
                icon={<MoreHorizontal20Regular />}
              />
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem icon={<WarningRegular />}>Report</MenuItem>
                <MenuItem icon={<AlertRegular />}>Remind</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        }
      />
      <CardFooter className={styles.cardFooter}>
        {link ? (
          <Link href={link} className={styles.link}>
            <Badge
              appearance="filled"
              shape="rounded"
              size="large"
              icon={<Link20Filled />}
            />
          </Link>
        ) : (
          <Badge appearance="filled" shape="rounded" size="large">
            {room}
          </Badge>
        )}
        <div className={styles.type}>
          {type && (
            <div className={styles.type}>
              <Tag appearance="brand" size="small">
                {type}
              </Tag>
            </div>
          )}
        </div>
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
