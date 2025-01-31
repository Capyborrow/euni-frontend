import React from "react";
import {
  Card,
  CardHeader,
  Body1Strong,
  tokens,
  makeStyles,
  CardFooter,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "var(--card-corner-radius, 22px)",
    border: `1px solid transparent`,
    background: tokens.colorNeutralBackground1,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    width: "116px",
    height: "116px",
  },
  headerText: {
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "left",
    color: tokens.colorNeutralForeground1,
    marginTop: "10px",
  },
  footerText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    marginTop: "8px",
    marginLeft: "15px",
  },
});

interface CardDayProps {
  date: number;
  dayWeek: string;
  subjectName?: string;
}

const CardDay: React.FC<CardDayProps> = ({
  date,
  dayWeek,
}) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardHeader
        header={<Body1Strong className={styles.headerText}>{date}</Body1Strong>}
      />
      <CardFooter>
        <span className={styles.footerText}>{dayWeek}</span>
      </CardFooter>
    </Card>
  );
};

export default CardDay;