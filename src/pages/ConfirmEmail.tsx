import axios from "../api/axios";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Caption1,
  Display,
  LargeTitle,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

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

const ConfirmEmail = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const query = useQuery();
  const styles = useStyles();

  const handleConfirmEmail = () => {
    const email = query.get("email");
    const token = query.get("token");

    if (email && token) {
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
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className={styles.root}>
      {success === null ? (
        <Button onClick={handleConfirmEmail}>Confirm Email</Button>
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

export default ConfirmEmail;
