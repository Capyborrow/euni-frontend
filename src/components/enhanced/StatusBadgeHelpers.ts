import type { PresenceBadgeProps } from "@fluentui/react-badge";

export type StatusBadgeStatus =
  | "available-filled"
  | "available"
  | "busy-filled"
  | "busy"
  | "do-not-disturb-filled"
  | "do-not-disturb"
  | "blocked"
  | "away"
  | "out-of-office"
  | "offline"
  | "unknown";

export const statusMapping: Record<
  StatusBadgeStatus,
  { status: PresenceBadgeProps["status"]; outOfOffice: boolean }
> = {
  "available-filled": { status: "available", outOfOffice: false },
  available: { status: "available", outOfOffice: true },
  "busy-filled": { status: "busy", outOfOffice: false },
  busy: { status: "busy", outOfOffice: true },
  "do-not-disturb-filled": { status: "do-not-disturb", outOfOffice: false },
  "do-not-disturb": { status: "do-not-disturb", outOfOffice: true },
  blocked: { status: "blocked", outOfOffice: false },
  away: { status: "away", outOfOffice: false },
  "out-of-office": { status: "out-of-office", outOfOffice: false },
  offline: { status: "offline", outOfOffice: false },
  unknown: { status: "unknown", outOfOffice: false },
};

export const getStatusBadgeProps = (
  status: StatusBadgeStatus,
  rest?: Omit<PresenceBadgeProps, "status" | "outOfOffice">
): PresenceBadgeProps => {
  const mapping = statusMapping[status] || {
    status: "unknown",
    outOfOffice: false,
  };
  return { ...rest, status: mapping.status, outOfOffice: mapping.outOfOffice };
};
