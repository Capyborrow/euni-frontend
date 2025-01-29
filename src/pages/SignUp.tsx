import {
  Button,
  Caption1,
  RadioGroup,
  Radio,
  Field,
} from "@fluentui/react-components";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import FieldInput from "../components/FieldInput";
import FieldGroup from "../components/FieldGroup";
import axios from "../api/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import ROUTES from "../constants/routes";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

interface SignUpCredentials {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

const SignUp: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm<SignUpCredentials>(
    {
      mode: "onChange",
      defaultValues: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
      },
    }
  );

  const role = watch("role", "student");

  const onSubmit: SubmitHandler<SignUpCredentials> = async (data) => {
    try {
      const signupData = { ...data };
      delete signupData.confirmPassword;
      await axios.post("/Auth/Register", JSON.stringify(signupData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate(ROUTES.SIGN_IN);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <AuthCard
      title="Sign up"
      description={
        <Caption1>
          Already have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </Caption1>
      }
      footer={
        <Button
          appearance="primary"
          className={styles.button}
          aria-label="Sign up"
          onClick={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
      }
    >
      <FieldGroup>
        <FieldInput
          label="First name"
          required
          name="firstName"
          control={control}
          rules={{
            pattern: {
              value: /^[\p{Letter}]+$/u,
              message: "Invalid name",
            },
            maxLength: {
              value: 25,
              message: "Name too long",
            },
          }}
        />
        <FieldInput
          label="Middle name"
          name="middleName"
          control={control}
          rules={{
            pattern: {
              value: /^[\p{Letter}]+$/u,
              message: "Invalid name",
            },
            maxLength: {
              value: 25,
              message: "Name too long",
            },
          }}
        />
        <FieldInput
          label="Last name"
          required
          name="lastName"
          control={control}
          rules={{
            pattern: {
              value: /^[\p{Letter}]+$/u,
              message: "Invalid name",
            },
            maxLength: {
              value: 25,
              message: "Name too long",
            },
          }}
        />
      </FieldGroup>
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
      <FieldGroup>
        <FieldInput
          label="Password"
          required
          type="password"
          name="password"
          rules={{
            minLength: {
              value: 8,
              message: "Password too short",
            },
          }}
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
              value === watch("password") || "Passwords do not match",
          }}
        />
      </FieldGroup>
      <Field label="Role" required>
        <RadioGroup
          layout="horizontal"
          value={role}
          onChange={(_e, data) => setValue("role", data.value)}
        >
          <Radio value="student" label="Student" />
          <Radio value="teacher" label="Teacher" />
        </RadioGroup>
      </Field>
    </AuthCard>
  );
};

export default SignUp;
