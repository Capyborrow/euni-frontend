import { Link } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import LessonCard from "../components/LessonCard";

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
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Link to="/signin">Sign In</Link>
      <Link to="/dashboard">Dash</Link>
      <LessonCard
        subject="Subject name"
        name="Educator name"
        task="Task title"
        points={8}
        maxPoints={10}
        location="228"
      ></LessonCard>
    </div>
  );
}

export default Home;
