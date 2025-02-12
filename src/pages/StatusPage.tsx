import {
  Caption1,
  Display,
  LargeTitle,
  makeStyles,
  tokens,
  Button,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "1rem",
  },
  display: {
    color: tokens.colorBrandForeground2,
  },
});

interface StatusPageProps {
  status?: string;
  title?: string;
  description?: string;
  action?: string;
  onActionClick?: () => void;
}

function StatusPage({
  status,
  title,
  description,
  action,
  onActionClick,
}: StatusPageProps) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {status && <Display className={styles.display}>{status}</Display>}
      {title && <LargeTitle>{title}</LargeTitle>}
      {description && <Caption1>{description}</Caption1>}
      {action && (
        <Button
          appearance="primary"
          aria-label="Go back"
          onClick={onActionClick}
        >
          {action}
        </Button>
      )}
    </div>
  );
}

export default StatusPage;
