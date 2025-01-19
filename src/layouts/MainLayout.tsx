import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

function MainLayout() {
  return (
    <div>
      <TopNavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
