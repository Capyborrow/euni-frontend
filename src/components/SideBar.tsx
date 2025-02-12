import { DrawerProps } from "@fluentui/react-components";
import * as React from "react";
import {
  AppItem,
  Hamburger,
//   NavCategory,
//   NavCategoryItem,
//   NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
//   NavSectionHeader,
//   NavSubItem,
//   NavSubItemGroup,
} from "@fluentui/react-nav-preview";

import {
//   Label,
//   Radio,
//   RadioGroup,
//   Switch,
  Tooltip,
  makeStyles,
  tokens,
//   useId,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
//   BoxMultiple20Filled,
//   BoxMultiple20Regular,
//   DataArea20Filled,
//   DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
//   HeartPulse20Filled,
//   HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
//   NotePin20Filled,
//   NotePin20Regular,
//   People20Filled,
//   People20Regular,
//   PeopleStar20Filled,
//   PeopleStar20Regular,
//   Person20Filled,
//   PersonLightbulb20Filled,
//   PersonLightbulb20Regular,
//   Person20Regular,
//   PersonSearch20Filled,
//   PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

//const Person = bundleIcon(Person20Filled, Person20Regular);
const Schedule = bundleIcon(Board20Filled, Board20Regular);
const Notifications = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const Assignments = bundleIcon(
    DocumentBulletListMultiple20Filled,
    DocumentBulletListMultiple20Regular
  );
const News = bundleIcon(
    PreviewLink20Filled,
    PreviewLink20Regular
);

type DrawerType = Required<DrawerProps>["type"];

export const SideBar = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

//   const typeLableId = useId("type-label");
//   const linkLabelId = useId("link-label");
//   const multipleLabelId = useId("multiple-label");

  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");
  const [isMultiple, setIsMultiple] = React.useState(true);

  const linkDestination = enabledLinks ? "https://www.bing.com" : "";

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody>
          <AppItem
            icon={<PersonCircle32Regular />}
            as="a"
            href={linkDestination}
          >
            Profile
          </AppItem>
          <NavItem href={linkDestination} icon={<Schedule />} value="1">
            Schedule
          </NavItem>
          <NavItem href={linkDestination} icon={<Notifications />} value="2">
            Notifications
          </NavItem>
          <NavItem href={linkDestination} icon={<Assignments />} value="3">
            Assignments
          </NavItem>
          <NavItem href={linkDestination} icon={<News />} value="4">
            News
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};

export default SideBar;