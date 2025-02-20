import { makeStyles } from "@fluentui/react-components";
//import Lesson from "../components/Lesson";
const useStyles = makeStyles({
  root: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    height: "fit-content",
  },
});

const Timetable = () => {
  const styles = useStyles();

  return <div className={styles.root}></div>;
};

export default Timetable;
