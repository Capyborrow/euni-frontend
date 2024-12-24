import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h1>Main Layout</h1>
      <p>Welcome to the main layout!</p>
      <Outlet />
    </div>
  );
}

export default MainLayout;
