import { Button, Caption1 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../api/axios";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

interface ForgotPasswordCredentials {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const styles = useStyles();
  const { control, handleSubmit } = useForm<ForgotPasswordCredentials>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordCredentials> = async (data) => {
    try {
      await axios.post("/Auth/ForgotPassword", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (err) {
      console.error("Restore Password Error:", err);
      return;
    }
  };

  return (
    <AuthCard
      title="Forgot password?"
      description={
        <Caption1>
          Enter your user account email and we will send you a password reset
          link
        </Caption1>
      }
      footer={
        <Button
          appearance="primary"
          className={styles.button}
          aria-label="Restore password"
          onClick={handleSubmit(onSubmit)}
        >
          Send reset link
        </Button>
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
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }}
      />
    </AuthCard>
  );
};

export default ForgotPassword;
