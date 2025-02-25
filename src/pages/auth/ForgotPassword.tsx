import { useForm, SubmitHandler } from "react-hook-form";
import { Caption1 } from "@fluentui/react-components";
import AuthCard from "../components/auth/AuthCard";
import FieldInput from "../components/auth/FieldInput";
import useSubmit from "../hooks/useSubmit";
import AuthCardFooter from "../components/auth/AuthCardFooter";
import useFeedback from "../hooks/useFeedback";

interface ForgotPasswordCredentials {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

const ForgotPassword: React.FC = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordCredentials>({
    mode: "onChange",
  });

  const { submit, loading } = useSubmit();

  const { feedback, setFeedback } = useFeedback();

  const onSubmit: SubmitHandler<ForgotPasswordCredentials> = (data) => {
    submit<ForgotPasswordResponse>({
      url: "/Auth/ForgotPassword",
      data,
      onSuccess: () => {
        setFeedback({
          message: "Password reset link sent. Please check your email.",
          intent: "success",
        });
      },
      onError: (message) => {
        setFeedback({
          message:
            message || "Failed to send password reset link. Please try again.",
          intent: "error",
        });
      },
    });
  };

  return (
    <AuthCard
      title="Forgot password?"
      description={
        <Caption1>
          Enter your email, and we'll send you a password reset link.
        </Caption1>
      }
      footer={
        <AuthCardFooter
          message={feedback?.message} // Unified message
          intent={feedback?.intent} // Unified intent
          loading={loading}
          handleSubmit={handleSubmit(onSubmit)}
          buttonText="Send reset link"
          loadingText="Sending reset link"
        />
      }
    >
      <FieldInput
        label="Email"
        required
        type="email"
        name="email"
        control={control}
        rules={{
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Improved regex
            message: "Invalid email address",
          },
        }}
      />
    </AuthCard>
  );
};

export default ForgotPassword;
