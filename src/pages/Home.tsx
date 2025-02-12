import { Link } from "react-router-dom";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
// import LessonCard from "../components/LessonCard";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

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
  const { setAuth } = useAuth();

  const test = async () => {
    console.log("test");
    const response = await axiosPrivate.get("/Student");
    console.log(response.data);
  };

  const logout = async () => {
    try {
      const response = await axiosPrivate.post(
        "/Auth/Logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout Response:", response.data);
      setAuth({ accessToken: "", email: "" });
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  // const confirmEmail = async () => {
  //   try {
  //     const response = await axiosPrivate.post(
  //       "/Auth/ResendConfirmationEmail",
  //       { email: auth?.email },
  //       { withCredentials: true }
  //     );
  //     console.log("Confirm Email Response:", response.data);
  //   } catch (err) {
  //     console.error("Confirm Email Error:", err);
  //   }
  // };

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h1>Test</h1>
      <p>Welcome to the test page!</p>
      <Link to="/dashboard">Dashboard</Link>
      {/* <LessonCard
        subject="Subject name"
        name="Educator name"
        task="Task title"
        points={8}
        maxPoints={10}
        location="228"
      ></LessonCard> */}
      <Button appearance="primary" onClick={refresh}>
        Refresh
      </Button>
      <Button appearance="primary" onClick={test}>
        Test
      </Button>
      <Button appearance="primary" onClick={logout}>
        Logout
      </Button>
      {/* <Button appearance="primary" onClick={confirmEmail}>
        ConfirmEmail
      </Button> */}
    </div>
  );
}

export default Home;
