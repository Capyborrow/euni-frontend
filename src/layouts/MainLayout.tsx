import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import NavBar from "../components/NavBar";

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
    <div className={styles.root}>
      <NavBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
