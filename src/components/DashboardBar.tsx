import { Button, Input, makeStyles, tokens } from "@fluentui/react-components";
import {
  Alert32Regular,
  CalendarCheckmarkFilled,
  Search20Regular,
} from "@fluentui/react-icons";
import { Link } from "./enhanced/Link";
import ROUTES from "../constants/routes";
import UserMenu from "./auth/UserMenu";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DateControl from "./DateControl";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: ".5rem 1rem .5rem .5rem",
    gap: ".5rem",
    boxShadow: tokens.shadow8,
    position: "sticky",
    backgroundColor: tokens.colorNeutralBackground1,
    top: 0,
    zIndex: 999,
  },

  title: {
    color: tokens.colorBrandForeground2,
  },

  inputContainer: {
    flex: 1,
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 .5rem",
  },

  input: {
    flex: 1,
    maxWidth: "15rem",
  },
});

function DashboardBar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Link to={ROUTES.HOME} className={styles.title}>
        <Button
          appearance="primary"
          size="large"
          icon={<CalendarCheckmarkFilled fontSize="4rem" />}
        />
      </Link>

      <div className={styles.inputContainer}>
        <Input
          className={styles.input}
          placeholder="Search"
          contentBefore={<Search20Regular />}
          appearance="filled-darker"
        />
        <DateControl />
      </div>
      {auth?.accessToken ? (
        <>
          <Button
            icon={<Alert32Regular />}
            appearance="subtle"
            size="large"
            shape="circular"
          />
          <UserMenu />
        </>
      ) : (
        <Button
          appearance="primary"
          size="medium"
          onClick={() => navigate(ROUTES.SIGN_IN)}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}

export default DashboardBar;
