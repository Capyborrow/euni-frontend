import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useForm, SubmitHandler } from "react-hook-form";
import { Caption1, Checkbox } from "@fluentui/react-components";
import AuthCard from "../../components/auth/AuthCard";
import FieldInput from "../../components/auth/FieldInput";
import useAuth from "../../hooks/useAuth";
import { AuthData as LoginResponse } from "../../context/AuthProvider";
import useSubmit from "../../hooks/useSubmit";
import { jwtDecode } from "jwt-decode";
import AuthCardFooter from "../../components/auth/AuthCardFooter";
import useFeedback from "../../hooks/useFeedback";

interface LoginRequest {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setAuth, persist, togglePersist } = useAuth();
  const { control, handleSubmit } = useForm<LoginRequest>({
    mode: "onChange",
  });
  const { submit, loading } = useSubmit();

  const { feedback, setFeedback } = useFeedback();

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    submit({
      url: "/Auth/Login",
      data,
      redirect: ROUTES.HOME,
      onSuccess: (data: LoginResponse) => {
        setAuth({
          accessToken: data.accessToken,
          email: jwtDecode<{ email: string }>(data.accessToken).email,
        });
      },
      onError: (message) => {
        setFeedback({
          message: message || "Failed to sign in. Please try again.",
          intent: "error",
        });
      },
    });
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
        <AuthCardFooter
          message={feedback?.message} // Unified message
          intent={feedback?.intent} // Unified intent
          loading={loading}
          handleSubmit={handleSubmit(onSubmit)}
          buttonText="Sign in"
          loadingText="Signing in"
        />
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
      <Checkbox
        label="Remember me"
        onChange={togglePersist}
        checked={persist}
      />
    </AuthCard>
  );
};

export default Login;
