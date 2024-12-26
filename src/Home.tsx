import { Link } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",

    flexDirection: "column",
    gap: "1rem",
    minHeight: "100vh",
    padding: "2rem",
  },
});

function Home() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Link to="/signin">Sign In</Link>
    </div>
  );
}

export default Home;
