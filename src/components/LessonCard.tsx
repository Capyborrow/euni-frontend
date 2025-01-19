import {
  Card,
  CardHeader,
  Body1Strong,
  Caption1Strong,
  tokens,
  makeStyles,
  Avatar,
  CardFooter,
  Button,
  Badge,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    width: "fit-content",
  },
  name: {
    color: tokens.colorNeutralForeground3,
  },
});

interface LessonCardProps {
  subject: string;
  name: string;
  task: string;
  points: number;
  maxPoints: number;
  location: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  subject,
  name,
  task,
  points,
  maxPoints,
  location,
}) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardHeader
        image={<Avatar></Avatar>}
        header={<Body1Strong>{subject}</Body1Strong>}
        description={
          <Caption1Strong className={styles.name}>{name}</Caption1Strong>
        }
      />
      <CardFooter>
        <Button appearance="secondary">{task}</Button>
        <Badge
          size="extra-large"
          appearance="filled"
          color="informative"
          shape="rounded"
        >
          {points}/{maxPoints}
        </Badge>
        <Badge
          size="extra-large"
          appearance="filled"
          color="informative"
          shape="rounded"
        >
          {location}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
