import { Outlet } from "react-router-dom";
import DashboardBar from "../components/DashboardBar";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DateProvider } from "../context/DateProvider";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  outlet: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: tokens.colorBrandBackground2,
  },
});

function MainLayout() {
  const styles = useStyles();

  return (
    <DateProvider>
      <div className={styles.root}>
        <DashboardBar />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </DateProvider>
  );
}

export default MainLayout;
