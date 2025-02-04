import {
  Card,
  CardHeader,
  CardFooter,
  tokens,
  LargeTitle,
  Caption1,
} from "@fluentui/react-components";
import { ReactNode } from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    minWidth: "20rem",
    maxWidth: "30rem",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    gap: "1rem",
  },
});

interface AuthCardProps {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
  footer,
}) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<LargeTitle>{title}</LargeTitle>}
        description={
          description ? <Caption1>{description}</Caption1> : undefined
        }
      />
      <div className={styles.content}> {children}</div>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default AuthCard;
