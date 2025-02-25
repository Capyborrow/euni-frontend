import {
  Avatar,
  Button,
  Tooltip,
  AvatarNamedColor,
  PresenceBadgeStatus,
} from "@fluentui/react-components";

const AvatarButton: React.FC<{
  tooltip: string;
  icon: JSX.Element;
  badgeStatus?: PresenceBadgeStatus;
  outOfOffice?: boolean;
}> = ({ tooltip, icon, badgeStatus, outOfOffice }) => (
  <Tooltip content={tooltip} relationship="description" showDelay={1000}>
    <Button
      size="medium"
      appearance="subtle"
      icon={
        <Avatar
          icon={icon}
          color={"" as AvatarNamedColor}
          badge={
            badgeStatus
              ? { size: "extra-small", status: badgeStatus, outOfOffice }
              : undefined
          }
          shape="square"
          size={24}
        />
      }
    />
  </Tooltip>
);

export default AvatarButton;
