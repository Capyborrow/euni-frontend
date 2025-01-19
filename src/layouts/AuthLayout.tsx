import { makeStyles, Display, Card, tokens } from "@fluentui/react-components";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    [`@media (max-width: 768px)`]: {
      flexDirection: "column",
    },
  },
  leftPanel: {
    maxWidth: "30rem",
    display: "flex",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.colorBrandForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    [`@media (max-width: 768px)`]: {
      display: "none",
    },
  },
  rightContent: {
    padding: "2rem",
    display: "flex",
    flex: "2",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tokens.colorBrandBackground2,
  },
});

const AuthLayout: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Card className={styles.leftPanel}>
        <Display>eUni</Display>
      </Card>
      <div className={styles.rightContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
