import { Link } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useForm, SubmitHandler } from "react-hook-form";
import { Caption1, RadioGroup, Radio, Field } from "@fluentui/react-components";
import AuthCard from "../components/AuthCard";
import AuthCardFooter from "../components/AuthCardFooter";
import FieldGroup from "../components/FieldGroup";
import FieldInput from "../components/FieldInput";
import useSubmit from "../hooks/useSubmit";
import useFeedback from "../hooks/useFeedback";

interface RegisterRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

interface RegisterResponse {
  message: string;
}

const Register: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<RegisterRequest>({
    mode: "onChange",
    defaultValues: {
      role: "student",
    },
  });

  const role = watch("role", "student");

  const { submit, loading } = useSubmit();

  const { feedback, setFeedback } = useFeedback();

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    sessionStorage.setItem("registeredEmail", data.email);
    submit<RegisterResponse>({
      url: "/Auth/Register",
      data,
      redirect: ROUTES.CONFIRM_EMAIL,
      onError: (message) => {
        setFeedback({
          message: message || "Failed to sign up. Please try again.",
          intent: "error",
        });
      },
    });
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
        <AuthCardFooter
          message={feedback?.message} // Unified message
          intent={feedback?.intent} // Unified intent
          loading={loading}
          handleSubmit={handleSubmit(onSubmit)}
          buttonText="Sign up"
          loadingText="Signing up"
        />
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

export default Register;
