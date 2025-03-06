import { Link } from "../components/Link";
import { makeStyles, tokens } from "@fluentui/react-components";
import ROUTES from "../constants/routes";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",

    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    width: "100%",
    minHeight: "100vh",
  },
});

function Home() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h1>Test</h1>
      <p>Welcome to the test page!</p>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.SIGN_IN}>Sign in (auth)</Link>
      <Link to={ROUTES.SIGN_UP}>Sign up (auth)</Link>
      <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password (auth)</Link>
      <Link to={ROUTES.RESET_PASSWORD}>Reset password (auth)</Link>
      <Link to={ROUTES.CONFIRM_EMAIL}>Confirm email (auth)</Link>
      <Link to={ROUTES.CONFIRM_EMAIL_STATUS}>Confirm email (status)</Link>
      <Link to={ROUTES.TIMETABLE}>Timetable (student)</Link>
      <Link to={ROUTES.TIMETABLE_MOCK}>Timetable mock (student)</Link>
      <Link to={ROUTES.DASHBOARD}>Dashboard (teacher)</Link>
      <Link to={ROUTES.UNAUTHORIZED}>Unauthorized (status)</Link>
      <Link to="/somenonexistingroute">Not found (status)</Link>
    </div>
  );
}

export default Home;
