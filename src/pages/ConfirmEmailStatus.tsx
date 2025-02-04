import axios from "../api/axios";
import { useState, useMemo, useEffect, useRef } from "react"; // Add useRef
import { useLocation } from "react-router-dom";
import {
  Caption1,
  Display,
  LargeTitle,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import Loading from "./Loading";

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
  const requestMade = useRef(false); // Track if the request has been made

  useEffect(() => {
    const email = query.get("email");
    const token = query.get("token");

    // Only make the request if it hasn't been made already
    if (email && token && !requestMade.current) {
      requestMade.current = true; // Mark the request as made

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
      // If email or token is missing, mark as failed
      setSuccess(false);
    }
  }, [query]); // Only re-run if `query` changes

  return (
    <div className={styles.root}>
      {success === null ? (
        <Loading />
      ) : success ? (
        <>
          <Display className={styles.display}>Success</Display>
          <LargeTitle>Email verified</LargeTitle>
          <Caption1>You may now close this tab</Caption1>
        </>
      ) : (
        <>
          <Display className={styles.display}>Failed</Display>
          <LargeTitle>Couldn't verify your email</LargeTitle>
          <Caption1>Please try again later or contact support</Caption1>
        </>
      )}
    </div>
  );
};

export default ConfirmEmailStatus;
