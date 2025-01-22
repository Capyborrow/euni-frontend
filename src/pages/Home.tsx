import { Link } from "react-router-dom";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import LessonCard from "../components/LessonCard";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  const test = async () => {
    console.log("test");
    const response = await axiosPrivate.get("/Student");
    console.log(response.data);
  };

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
      <Button appearance="primary" onClick={refresh}>
        Refresh
      </Button>
      <Button appearance="primary" onClick={test}>
        Test
      </Button>
    </div>
  );
}

export default Home;
