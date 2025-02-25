import {
  Button,
  MessageBar,
  MessageBarBody,
  Spinner,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

interface AuthCardFooterProps {
  message?: string | null; // Combined message for error or success
  intent?: "error" | "success" | "info" | "warning"; // Intent to determine the type of message
  loading: boolean;
  handleSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  buttonText: string;
  loadingText: string;
}

const AuthCardFooter: React.FC<AuthCardFooterProps> = ({
  message,
  intent,
  loading,
  handleSubmit,
  buttonText,
  loadingText,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {/* Render MessageBar if there's a message */}
      {message && (
        <MessageBar intent={intent}>
          <MessageBarBody>
            {message.includes("Email not confirmed") ? (
              <>
                {message} <Link to={ROUTES.CONFIRM_EMAIL}>Confirm.</Link>
              </>
            ) : (
              message
            )}
          </MessageBarBody>
        </MessageBar>
      )}

      <Button
        appearance="primary"
        onClick={handleSubmit}
        disabled={loading}
        icon={loading ? <Spinner size="tiny" /> : undefined}
      >
        {loading ? loadingText : buttonText}
      </Button>
    </div>
  );
};

export default AuthCardFooter;
