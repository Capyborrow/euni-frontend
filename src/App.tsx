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
import PersistLogin from "./components/PersistLogin";
import ConfirmEmail from "./pages/ConfirmEmail";
import ConfirmEmailStatus from "./pages/ConfirmEmailStatus";
import Timetable from "./pages/Timetable";
import TimetableTest from "./pages/TimetableTest";

const SignUp = lazy(() => import("./pages/Register"));
const SignIn = lazy(() => import("./pages/Login"));
const RestorePassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

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
          <Route element={<PersistLogin />}>
            <Route
              element={<ProtectedRoute allowedRoles={["student", "teacher"]} />}
            >
              <Route element={<MainLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
              </Route>
            </Route>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.TIMETABLE} element={<Timetable />} />
              <Route path={ROUTES.TEST} element={<TimetableTest />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
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
