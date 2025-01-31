import { makeStyles, tokens } from "@fluentui/react-components";
import SubjectProgressCard from "../components/SubjectProgressCard.tsx";
import CardDay from "../components/CardDay.tsx";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    width: "100%",
    height: "100vh",
  },
  daysContainer: {
    position: "absolute",
    bottom: "3rem", 
    left: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
  subjectsContainer: {
    position: "absolute",
    bottom: "3rem",
    right: "2rem",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
});

function Profile() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.daysContainer}>
        <div className={styles.row}>
          <CardDay date={1} dayWeek="Mon" />
          <CardDay date={2} dayWeek="Tue" />
          <CardDay date={3} dayWeek="Wed" />
        </div>
        <div className={styles.row}>
          <CardDay date={4} dayWeek="Thu" />
          <CardDay date={5} dayWeek="Fri" />
          <CardDay date={6} dayWeek="Sat" />
        </div>
      </div>

      <div className={styles.subjectsContainer}>
        <SubjectProgressCard subject="Subject 1" tasksCompleted="8/10" />
        <SubjectProgressCard subject="Subject 2" tasksCompleted="5/10" />
        <SubjectProgressCard subject="Subject 3" tasksCompleted="3/10" />
      </div>
    </div>
  );
}

export default Profile;
