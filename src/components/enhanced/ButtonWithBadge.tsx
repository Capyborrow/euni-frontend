import { forwardRef } from "react";
import {
  Avatar,
  Button,
  AvatarNamedColor,
  ButtonProps,
  PresenceBadgeProps,
} from "@fluentui/react-components";

type ButtonWithBadgeProps = ButtonProps & {
  icon: JSX.Element;
  badgeProps?: PresenceBadgeProps;
};

const ButtonWithBadge = forwardRef<HTMLButtonElement, ButtonWithBadgeProps>(
  (
    {
      icon,
      badgeProps,
      size = "medium",
      appearance = "subtle",
      ...buttonProps
    },
    ref
  ) => (
    <Button
      size={size}
      appearance={appearance}
      icon={
        <Avatar
          icon={icon}
          size={24}
          color={"" as AvatarNamedColor}
          badge={badgeProps}
          shape="square"
        />
      }
      {...buttonProps}
      ref={ref}
    />
  )
);

ButtonWithBadge.displayName = "ButtonWithBadge";

export default ButtonWithBadge;
