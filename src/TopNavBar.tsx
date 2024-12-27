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
  Apps32Filled,
  Search20Regular,
  Settings32Regular,
} from "@fluentui/react-icons";

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
});

function TopNavBar() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Apps32Filled className={styles.title} />
      <Title1 className={styles.title}>eUni</Title1>
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
