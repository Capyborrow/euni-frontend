import { Field, Input } from "@fluentui/react-components";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { useController, Control } from "react-hook-form";

const useStyles = makeStyles({
  field: {
    flex: "1",
    alignContent: "start",
  },
  input: {
    height: "1.5rem",
    minWidth: "8rem",
  },
});

interface FieldInputProps {
  label: string;
  required?: boolean;
  type?:
    | "number"
    | "text"
    | "search"
    | "time"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "date"
    | "datetime-local"
    | "month"
    | "week";
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  rules?: object;
  hint?: React.ReactNode;
  className?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  required = false,
  type = "text",
  name,
  control,
  rules = {},
  hint,
  className,
}) => {
  const styles = useStyles();

  const combinedRules = required
    ? { required: { value: true, message: "Required field" }, ...rules }
    : rules;

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: combinedRules,
  });

  const validationState = error ? "error" : undefined;

  return (
    <Field
      label={label}
      required={required}
      validationState={validationState}
      validationMessage={error?.message}
      hint={hint ? { children: hint } : undefined}
      className={mergeClasses(className, styles.field)}
    >
      <Input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        appearance="filled-darker"
        aria-label={label}
        className={styles.input}
      />
    </Field>
  );
};

export default FieldInput;
