import {
  Caption1,
  Display,
  LargeTitle,
  makeStyles,
  tokens,
  Button,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "0.5rem",
  },
  display: {
    color: tokens.colorBrandForeground2,
  },
});

function Unauthorized() {
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Display className={styles.display}>401</Display>
      <LargeTitle>Unauthorized</LargeTitle>
      <Caption1>You do not have access to the requested page</Caption1>
      <Button
        appearance="primary"
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        {" "}
        Return
      </Button>
    </div>
  );
}

export default Unauthorized;
