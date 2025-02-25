import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import ROUTES from "./constants/routes";
import NotFound from "./pages/status/NotFound";
import Unauthorized from "./pages/status/Unauthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loading from "./pages/status/Loading";
import PersistLogin from "./components/auth/PersistLogin";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import ConfirmEmailStatus from "./pages/auth/ConfirmEmailStatus";
import Timetable from "./pages/Timetable";
import Profile from "./pages/Profile";

const SignUp = lazy(() => import("./pages/auth/Register"));
const SignIn = lazy(() => import("./pages/auth/Login"));
const RestorePassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
  },
});

function App() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.TIMETABLE} element={<Timetable />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              </Route>
            </Route>
            <Route
              element={<ProtectedRoute allowedRoles={["student", "teacher"]} />}
            >
              <Route element={<MainLayout />}>
                <Route path={ROUTES.PROFILE} element={<Profile />} />
              </Route>
            </Route>
          </Route>

          <Route
            path={ROUTES.CONFIRM_EMAIL_STATUS}
            element={<ConfirmEmailStatus />}
          />
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<RestorePassword />}
            />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
