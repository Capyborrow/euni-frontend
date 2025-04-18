import * as React from "react";
import type {
  PresenceBadgeProps,
  PresenceBadgeState,
} from "@fluentui/react-badge";
import {
  usePresenceBadge_unstable,
  usePresenceBadgeStyles_unstable,
  renderBadge_unstable,
} from "@fluentui/react-badge";
import { getStatusBadgeProps, StatusBadgeStatus } from "./StatusBadgeHelpers";

type CustomBadgeProps = Omit<PresenceBadgeProps, "status" | "outOfOffice"> & {
  status: StatusBadgeStatus;
};

export const StatusBadge = React.forwardRef<HTMLElement, CustomBadgeProps>(
  (props, ref) => {
    const { status: appearance, ...rest } = props;
    const presenceBadgeProps: PresenceBadgeProps = getStatusBadgeProps(
      appearance,
      rest
    );
    const state: PresenceBadgeState = usePresenceBadge_unstable(
      presenceBadgeProps,
      ref
    );
    usePresenceBadgeStyles_unstable(state);
    return renderBadge_unstable(state);
  }
);
