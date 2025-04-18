import { FC } from "react";
import { Divider, makeStyles } from "@fluentui/react-components";
import { format } from "date-fns";

const useStyles = makeStyles({
  headerDivider: {
    gridRow: "1",
    gridColumn: "1",
    visibility: "hidden",
  },
  dividerNone: {
    "::after": {
      display: "none",
    },
    "::before": {
      display: "none",
    },
  },
  dividerRight: {
    "::before": {
      display: "none",
    },
  },
  dividerContainer: {
    gridColumn: "1/-1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "1rem",
  },
});

interface TimetableDividersProps {
  timeSlots: [Date, Date][];
}

const TimetableDividers: FC<TimetableDividersProps> = ({ timeSlots }) => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.headerDivider}>
        <Divider className={styles.dividerNone} alignContent="start">
          00:00
        </Divider>
      </div>
      {timeSlots.map((slot, index) => {
        const dividerContent =
          index === 0 ? (
            <>
              <br />
              {format(slot[0], "HH:mm")}
            </>
          ) : (
            <>
              {format(timeSlots[index - 1][1], "HH:mm")}
              <br />
              {format(slot[0], "HH:mm")}
            </>
          );
        return (
          <div
            key={`divider-${index}`}
            className={styles.dividerContainer}
            style={{ gridRow: index * 2 + 2 }}
          >
            <Divider alignContent="start" className={styles.dividerRight}>
              {dividerContent}
            </Divider>
          </div>
        );
      })}
      <div
        key="bottom-divider"
        className={styles.dividerContainer}
        style={{ gridRow: timeSlots.length * 2 + 2 }}
      >
        <Divider alignContent="start" className={styles.dividerRight}>
          {format(timeSlots[timeSlots.length - 1][1], "HH:mm")}
          <br />
        </Divider>
      </div>
    </>
  );
};

export default TimetableDividers;
