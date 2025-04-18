import {
  Avatar,
  Body1,
  Body1Strong,
  CardHeader,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { format } from "date-fns";
import { useMemo } from "react";

const useStyles = makeStyles({
  cardHeader: {
    gridAutoColumns: "min-content minmax(0, 1fr) min-content",
  },
  headerContent: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    minWidth: 0,
  },
});

interface LessonHeaderProps {
  teacherName?: string;
  teacherAvatar?: string;
  subjectName?: string;
  lessonDate?: Date;
}

const LessonHeader = ({
  teacherName = "Unknown Teacher",
  teacherAvatar,
  subjectName = "Untitled Subject",
  lessonDate,
}: LessonHeaderProps) => {
  const styles = useStyles();

  const formattedDate = useMemo(
    () => (lessonDate ? format(lessonDate, "MMM dd yyyy") : ""),
    [lessonDate]
  );

  return (
    <CardHeader
      image={
        <Avatar
          color="colorful"
          name={teacherName}
          image={teacherAvatar ? { src: teacherAvatar } : undefined}
        />
      }
      className={styles.cardHeader}
      header={
        <div className={styles.headerContent}>
          <Body1Strong truncate wrap={false}>
            {subjectName}
          </Body1Strong>
          {formattedDate && (
            <Body1 truncate wrap={false}>
              • {formattedDate}
            </Body1>
          )}
        </div>
      }
      description={
        <Body1 truncate wrap={false}>
          {teacherName}
        </Body1>
      }
    />
  );
};

export default LessonHeader;
