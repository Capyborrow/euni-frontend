import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardFooter,
  Link,
  Tag,
  PresenceBadge,
  Tooltip,
  Caption1Strong,
  Caption1,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  PresenceBadgeStatus,
  Badge,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Link20Filled,
  Backpack24Regular,
  Comment24Regular,
} from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";
import {
  LessonStatusEnum,
  AssignmentStatusEnum,
  CommentStatusEnum,
  LessonTypeEnum,
} from "../types/Lesson";
import ButtonWithBadge from "./ButtonWithBadge";

interface StatusMetadata {
  icon: PresenceBadgeStatus;
  outOfOffice?: boolean;
  tooltip: string;
}

const lessonStatusMap: Record<LessonStatusEnum, StatusMetadata> = {
  [LessonStatusEnum.Attended]: {
    icon: "available",
    tooltip: "You attended this lesson",
  },
  [LessonStatusEnum.Skipped]: {
    icon: "do-not-disturb",
    tooltip: "You skipped this lesson",
  },
  [LessonStatusEnum.Excused]: {
    icon: "do-not-disturb",
    tooltip: "You were excused from this lesson",
    outOfOffice: true,
  },
  [LessonStatusEnum.Cancelled]: {
    icon: "offline",
    tooltip: "This lesson was cancelled",
  },
  [LessonStatusEnum.Unknown]: { icon: "unknown", tooltip: "Status" },
};

const assignmentStatusMap: Record<AssignmentStatusEnum, StatusMetadata> = {
  [AssignmentStatusEnum.Due]: {
    icon: "away",
    tooltip: "You have tasks due soon",
  },
  [AssignmentStatusEnum.Overdue]: {
    icon: "do-not-disturb",
    tooltip: "You have tasks overdue",
  },
  [AssignmentStatusEnum.Submitted]: {
    icon: "available",
    tooltip: "You have tasks in review",
    outOfOffice: true,
  },
  [AssignmentStatusEnum.Graded]: {
    icon: "available",
    tooltip: "You have completed all tasks",
  },
  [AssignmentStatusEnum.Expired]: {
    icon: "offline",
    tooltip: "You have expired tasks",
  },
};

export interface LessonProps {
  subject: string;
  teacherName: string;
  teacherAvatar?: string;
  link?: string;
  room?: string;
  type?: LessonTypeEnum;
  status?: LessonStatusEnum;
  assignmentStatus?: AssignmentStatusEnum;
  commentStatus?: CommentStatusEnum;
  className?: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: "9rem",
    gap: "0.5rem",
    padding: "0.5rem",
    width: "100%",
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

const Lesson: React.FC<LessonProps> = ({
  subject,
  teacherName,
  teacherAvatar,
  link,
  room,
  type,
  status = LessonStatusEnum.Unknown,
  assignmentStatus,
  commentStatus,
  className,
}) => {
  const styles = useStyles();

  return (
    <Card size="medium" className={mergeClasses(styles.root, className)}>
      <CardHeader
        className={styles.cardHeader}
        image={
          <Avatar
            color="colorful"
            name={teacherName}
            image={{ src: teacherAvatar }}
          />
        }
        header={
          <Caption1Strong truncate wrap={false}>
            {subject}
          </Caption1Strong>
        }
        description={
          <Caption1 truncate wrap={false}>
            {teacherName}
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
        <ButtonWithBadge
          tooltip={
            assignmentStatus
              ? assignmentStatusMap[assignmentStatus]?.tooltip
              : "Assignments"
          }
          icon={<Backpack24Regular />}
          badgeStatus={
            assignmentStatus
              ? assignmentStatusMap[assignmentStatus]?.icon
              : undefined
          }
          outOfOffice={
            assignmentStatus
              ? assignmentStatusMap[assignmentStatus]?.outOfOffice
              : undefined
          }
        />

        <ButtonWithBadge
          tooltip={
            commentStatus === CommentStatusEnum.Unread
              ? "You have comments unread"
              : "Comments"
          }
          icon={<Comment24Regular />}
          badgeStatus={
            commentStatus === CommentStatusEnum.Unread ? "busy" : undefined
          }
        />
        <div style={{ width: "100%" }} />
        <Tooltip
          content={lessonStatusMap[status]?.tooltip ?? "Unknown status"}
          relationship="description"
          showDelay={1000}
        >
          <Badge
            size="large"
            appearance="ghost"
            icon={
              <PresenceBadge
                size="medium"
                status={lessonStatusMap[status]?.icon ?? "unknown"}
                outOfOffice={lessonStatusMap[status]?.outOfOffice}
              />
            }
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default Lesson;
