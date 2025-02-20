import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {},
  outlet: {},
});

function MainLayout() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TopNavBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
