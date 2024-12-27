import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./MainLayout";
import AuthLayout from "./AuthLayout";
import Home from "./Home";
import NotFound from "./NotFound";
import { makeStyles } from "@fluentui/react-components";

const SignUp = lazy(() => import("./SignUp"));
const SignIn = lazy(() => import("./SignIn"));
const RestorePassword = lazy(() => import("./RestorePassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));

const ROUTES = {
  HOME: "/",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  PASSWORD_RESTORE: "/password_restore",
  PASSWORD_RESET: "/password_reset",
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function App() {
  const styles = useStyles();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.root}></div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.PASSWORD_RESTORE} element={<RestorePassword />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
