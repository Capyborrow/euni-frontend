import { LargeTitle, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "0.5rem",
    color: tokens.colorBrandForeground2,
  },
});

function Loading() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <LargeTitle>Loading</LargeTitle>
    </div>
  );
}

export default Loading;
