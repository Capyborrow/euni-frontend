import * as React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Body1,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  cardRoot: {
    display: "flex",
    flexDirection: "column",
    width: "240px",
    height: "240px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "20px",
    boxShadow: tokens.shadow8,
    padding: "20px",
  },

  headerText: {
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: "40px",
    lineHeight: "44px",
    fontWeight: 600,
    margin: 0,
    marginBottom: "auto",
  },

  cardFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
  },

  footerText: {
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    margin: 0,
    textAlign: "center",
  },
});

interface SubjectProgressCardProps {
  subject: string;
  tasksCompleted: string;
}

const SubjectProgressCard: React.FC<SubjectProgressCardProps> = ({
  subject,
  tasksCompleted,
}) => {
  const styles = useStyles();

  return (
    <Card className={styles.cardRoot}>
      <CardHeader
        header={<h2 className={styles.headerText}>{subject}</h2>}
      />
      <CardFooter className={styles.cardFooter}>
        <Body1 className={styles.footerText}>
          Tasks completed - {tasksCompleted}
        </Body1>
      </CardFooter>
    </Card>
  );
};

export default SubjectProgressCard;
