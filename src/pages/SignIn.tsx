import { Button, Caption1 } from "@fluentui/react-components";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import { useForm, SubmitHandler } from "react-hook-form";
import ROUTES from "../constants/routes";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

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
  const { setAuth, auth } = useAuth();
  const { control, handleSubmit } = useForm<SignInCredentials>({
    mode: "onChange",
  });

  useEffect(() => {
    console.log("User:", auth?.user);
  }, [auth]);

  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    try {
      const response = await axios.post("/Auth/Login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(JSON.stringify(response?.data));
      console.log(response.headers);
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken, user: data.email });
      console.log("User:", auth?.user);
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
