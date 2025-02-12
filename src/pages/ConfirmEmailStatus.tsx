import axios from "../api/axios";
import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import Loading from "./Loading";
import StatusPage from "./StatusPage"; // Import StatusPage

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "0.5rem",
  },
  display: {
    color: tokens.colorBrandForeground2,
  },
});

function useQuery() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location]);
}

const ConfirmEmailStatus = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const query = useQuery();
  const styles = useStyles();
  const requestMade = useRef(false);

  useEffect(() => {
    const email = query.get("email");
    const token = query.get("token");

    if (email && token && !requestMade.current) {
      requestMade.current = true;

      axios
        .post("/Auth/ConfirmEmail", JSON.stringify({ email, token }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          console.error("Confirm Email Error:", err);
          setSuccess(false);
        });
    } else if (!email || !token) {
      setSuccess(false);
    }
  }, [query]);

  return (
    <div className={styles.root}>
      {success === null ? (
        <Loading />
      ) : (
        <StatusPage
          status={success ? "Success" : "Failed"}
          title={success ? "Email verified" : "Couldn't verify your email"}
          description={
            success
              ? "You may now close this tab"
              : "Please try again later or contact support"
          }
        />
      )}
    </div>
  );
};

export default ConfirmEmailStatus;
