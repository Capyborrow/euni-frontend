import { makeStyles } from "@fluentui/react-components";
import React from "react";

// Styles
const useStyles = makeStyles({
  fieldGroup: {
    display: "flex",
    flexWrap: "wrap", // Allow wrapping for smaller screens
    gap: "1rem", // 16px
  },
});

interface FieldGroupProps {
  children: React.ReactNode;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.fieldGroup}>{children}</div>;
};

export default FieldGroup;
