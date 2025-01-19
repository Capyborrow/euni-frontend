import { makeStyles } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  fieldGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
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
