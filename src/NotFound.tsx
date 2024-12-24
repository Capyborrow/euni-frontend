import {
  Caption1,
  Display,
  LargeTitle,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  display: {
    color: tokens.colorBrandForeground2,
  },
});

function NotFound() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Display className={styles.display}>404</Display>
      <LargeTitle>Not Found</LargeTitle>
      <Caption1>The page you are looking for does not exist</Caption1>
    </div>
  );
}

export default NotFound;
