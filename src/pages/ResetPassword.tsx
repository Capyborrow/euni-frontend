import { useForm, SubmitHandler } from "react-hook-form";
import { Caption1 } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import FieldGroup from "../components/FieldGroup";
import useSubmit from "../hooks/useSubmit";
import ROUTES from "../constants/routes";
import { useLocation } from "react-router-dom";
import AuthCardFooter from "../components/AuthCardFooter";
import useFeedback from "../hooks/useFeedback";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface ResetPasswordCredentials {
  password: string;
  confirmPassword?: string;
}

interface ResetPasswordResponse {
  message: string;
}

const ResetPassword: React.FC = () => {
  const query = useQuery();
  const email = query.get("email");
  const token = query.get("token");
  const { control, handleSubmit, watch } = useForm<ResetPasswordCredentials>({
    mode: "onChange",
  });

  const { submit, loading } = useSubmit();

  const { feedback, setFeedback } = useFeedback();

  const onSubmit: SubmitHandler<ResetPasswordCredentials> = (data) => {
    submit<ResetPasswordResponse>({
      url: "/Auth/ResetPassword",
      data: { email, token, newPassword: data.password },
      redirect: ROUTES.SIGN_IN,
      onSuccess: () => {
        setFeedback({
          message: "Password reset successfully.",
          intent: "success",
        });
      },
      onError: (message) => {
        setFeedback({
          message: message || "Failed to reset password. Please try again.",
          intent: "error",
        });
      },
    });
  };

  const passwordValue = watch("password");

  return (
    <AuthCard
      title="Reset password"
      description={
        <Caption1>Come up with a new password for your account</Caption1>
      }
      footer={
        <AuthCardFooter
          message={feedback?.message} // Unified message
          intent={feedback?.intent} // Unified intent
          loading={loading}
          handleSubmit={handleSubmit(onSubmit)}
          buttonText="Reset password"
          loadingText="Resetting password"
        />
      }
    >
      <FieldGroup>
        <FieldInput
          label="Password"
          required
          type="password"
          name="password"
          control={control}
          rules={{
            minLength: {
              value: 8,
              message: "Password too short",
            },
          }}
        />
        <FieldInput
          label="Confirm password"
          required
          type="password"
          name="confirmPassword"
          control={control}
          rules={{
            validate: (value: string) =>
              value === passwordValue || "Passwords do not match",
          }}
        />
      </FieldGroup>
    </AuthCard>
  );
};

export default ResetPassword;
