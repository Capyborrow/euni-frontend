import { Button, Caption1 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "./AuthCard";
import FieldInput from "./FieldInput";
import FieldGroup from "./FieldGroup"; // Import FieldGroup Component
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Styles
const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

interface ResetPasswordCredentials {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate(); // Hook for navigation
  const { control, handleSubmit, watch } = useForm<ResetPasswordCredentials>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordCredentials> = (data) => {
    console.log("Reset Password Data:", data);
    navigate("/signin");
  };

  // Watch the password field for validation
  const passwordValue = watch("password");

  return (
    <AuthCard
      title="Reset password"
      description={
        <Caption1>Come up with a new password for your account</Caption1>
      }
      footer={
        <Button
          appearance="primary"
          className={styles.button}
          aria-label="Reset password"
          onClick={handleSubmit(onSubmit)}
        >
          Reset password
        </Button>
      }
    >
      <FieldGroup>
        <FieldInput
          label="Password"
          required
          type="password"
          name="password"
          control={control}
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
