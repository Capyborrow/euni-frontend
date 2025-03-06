import { Button, Input, makeStyles, tokens } from "@fluentui/react-components";
import {
  Alert32Regular,
  CalendarCheckmarkFilled,
  Search20Regular,
} from "@fluentui/react-icons";
import { Link } from "./Link";
import ROUTES from "../constants/routes";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import UserMenu from "./auth/UserMenu";

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

function NavBar() {
  const navigate = useNavigate();
  const { auth } = useAuth();
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

export default NavBar;
