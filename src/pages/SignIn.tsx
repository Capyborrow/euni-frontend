import { Button, Caption1 } from "@fluentui/react-components";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import axiosPrivate from "../api/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import ROUTES from "../constants/routes";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignInCredentials>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    try {
      await axiosPrivate.post(
        "/auth",
        JSON.stringify({ identifier: data.email, password: data.password })
      );
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error("Sign In Error:", err);
      return;
    }

    navigate("/");
  };

  return (
    <AuthCard
      title="Sign in"
      description={
        <Caption1>
          Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
        </Caption1>
      }
      footer={
        <Button
          appearance="primary"
          className={styles.button}
          aria-label="Sign in"
          onClick={handleSubmit(onSubmit)}
        >
          Sign in
        </Button>
      }
    >
      <FieldInput
        label="Email"
        required
        name="email"
        type="email"
        control={control}
        rules={{
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }}
      />
      <FieldInput
        label="Password"
        required
        name="password"
        type="password"
        control={control}
        hint={
          <Caption1>
            Forgot your password?{" "}
            <Link to={ROUTES.FORGOT_PASSWORD}>Restore</Link>
          </Caption1>
        }
      />
    </AuthCard>
  );
};

export default SignIn;
