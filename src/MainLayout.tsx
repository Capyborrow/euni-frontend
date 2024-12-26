import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";

function MainLayout() {
  return (
    <div>
      <TopNavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
