import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <div>
      <TopNavBar />
      <SideBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
