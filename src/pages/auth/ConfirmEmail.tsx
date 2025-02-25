import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { Caption1 } from "@fluentui/react-components";
import AuthCard from "../../components/auth/AuthCard";
import useSubmit from "../../hooks/useSubmit";
import AuthCardFooter from "../../components/auth/AuthCardFooter";
import useFeedback from "../../hooks/useFeedback";
import { useEffect } from "react";
import axios from "../../api/axios";

const ConfirmEmail: React.FC = () => {
  const navigate = useNavigate();

  const { submit, loading } = useSubmit();

  const { feedback, setFeedback } = useFeedback();

  const registeredEmail = sessionStorage.getItem("registeredEmail");

  useEffect(() => {
    if (!registeredEmail) {
      navigate(ROUTES.SIGN_UP);
    }
  }, [navigate, registeredEmail]);

  useEffect(() => {
    if (!registeredEmail) return;

    const checkEmailConfirmation = async () => {
      try {
        const response = await axios.post(
          "/Auth/CheckEmailConfirmation",
          JSON.stringify({ email: registeredEmail }),
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.data?.confirmed) {
          sessionStorage.removeItem("registeredEmail");
          navigate(ROUTES.SIGN_IN);
        }
      } catch (error) {
        console.error("Error checking email confirmation:", error);
      }
    };

    const interval = setInterval(checkEmailConfirmation, 10000);

    return () => clearInterval(interval);
  }, [navigate, registeredEmail]);

  const onSubmit = async () => {
    if (!registeredEmail) return;

    submit({
      url: "/Auth/ResendConfirmationEmail",
      data: { email: registeredEmail },
      onSuccess: () => {
        setFeedback({
          message: "Confirmation link sent. Please check your email.",
          intent: "success",
        });
      },
      onError: (message) => {
        setFeedback({
          message:
            message || "Failed to send confirmation link. Please try again.",
          intent: "error",
        });
      },
    });
  };

  return (
    <AuthCard
      title="Confirm Email"
      description={
        <Caption1>
          Have already confirmed your email?{" "}
          <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </Caption1>
      }
      footer={
        <AuthCardFooter
          message={feedback?.message}
          intent={feedback?.intent} // Unified intent
          loading={loading}
          handleSubmit={onSubmit}
          buttonText="Resend confirmation link"
          loadingText="Resending confirmation link"
        />
      }
    >
      <Caption1>
        We've sent a confirmation link to <strong>{registeredEmail}</strong>.
        Please check your email.
      </Caption1>
    </AuthCard>
  );
};

export default ConfirmEmail;
