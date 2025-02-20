import {
  Button,
  Input,
  Title1,
  Avatar,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  Alert32Regular,
  Search20Regular,
  Settings32Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import ROUTES from "../constants/routes";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: ".5rem .5rem",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
  },

  input: {
    flex: 1,
    maxWidth: "20rem",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
  },
});

function TopNavBar() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Link className={styles.link} to={ROUTES.HOME}>
        <Title1 className={styles.title}>eUni</Title1>
      </Link>

      <div className={styles.inputContainer}>
        <Input
          className={styles.input}
          placeholder="Search"
          contentBefore={<Search20Regular />}
          appearance="filled-darker"
        />
      </div>
      <Button icon={<Alert32Regular />} appearance="subtle" size="large" />
      <Button icon={<Settings32Regular />} appearance="subtle" size="large" />
      <Button icon={<Avatar />} appearance="transparent" size="large" />
    </div>
  );
}

export default TopNavBar;
