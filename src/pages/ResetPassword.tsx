import { Button, Caption1 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import FieldGroup from "../components/FieldGroup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ROUTES from "../constants/routes";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});
interface ResetPasswordCredentials {
  password: string;
  confirmPassword?: string;
}

const ResetPassword: React.FC = () => {
  const query = useQuery();
  const email = query.get("email");
  const token = query.get("token");
  const styles = useStyles();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm<ResetPasswordCredentials>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordCredentials> = async (data) => {
    try {
      await axios.post(
        "/Auth/ResetPassword",
        JSON.stringify({ email, token, newPassword: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate(ROUTES.SIGN_IN);
    } catch (err) {
      console.error("Reset Password Error:", err);
      return;
    }
  };

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
