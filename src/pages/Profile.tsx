import { makeStyles, tokens } from "@fluentui/react-components";

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

function Dashboard() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h1>Profile</h1>
      <p>Welcome to the Profile page!</p>
    </div>
  );
}

export default Dashboard;
