import { Button, Caption1 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "./AuthCard";
import FieldInput from "./FieldInput";
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

interface RestorePasswordCredentials {
  email: string;
}

const RestorePassword: React.FC = () => {
  const styles = useStyles();
  const { control, handleSubmit } = useForm<RestorePasswordCredentials>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RestorePasswordCredentials> = (data) => {
    console.log("Restore Password Data:", data);
  };

  return (
    <AuthCard
      title="Restore password"
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
          Restore password
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

export default RestorePassword;
