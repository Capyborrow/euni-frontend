import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import ROUTES from "./constants/routes";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loading from "./pages/Loading";

const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const RestorePassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function App() {
  const styles = useStyles();
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.root}></div>
      <Routes>
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<RestorePassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
