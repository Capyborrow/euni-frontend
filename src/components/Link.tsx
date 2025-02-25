import React from "react";
import {
  Link as FluentLink,
  useLinkStyles_unstable,
  type LinkState,
  type LinkProps as FluentLinkProps,
} from "@fluentui/react-components";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type ReusableLinkProps = Omit<FluentLinkProps, "as"> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  RouterLinkProps & {
    /**
     * When provided, renders a React Router Link.
     */
    to?: string;
    /**
     * When rendering a standard anchor element.
     */
    href?: string;
  };

/**
 * A reusable Link component that applies Fluent UI styling
 * and conditionally renders a React Router Link or a FluentLink.
 */
export const Link: React.FC<ReusableLinkProps> = ({
  to,
  href,
  children,
  // Destructure Fluent UI–specific props so we can pass them to the dummy state.
  appearance = "default",
  disabled = false,
  disabledFocusable = false,
  inline = false,
  ...rest
}) => {
  // Create a dummy LinkState that reflects the passed props.
  const dummyLinkState: LinkState = {
    components: { root: "a" },
    root: {},
    appearance,
    disabled,
    disabledFocusable,
    inline,
  };

  const {
    root: { className: linkClassName },
  } = useLinkStyles_unstable(dummyLinkState);

  if (to) {
    // When using React Router, render RouterLink.
    return (
      <RouterLink to={to} className={linkClassName} {...rest}>
        {children}
      </RouterLink>
    );
  }

  // Render FluentLink as an anchor element.
  return (
    <FluentLink as="a" href={href} className={linkClassName} {...rest}>
      {children}
    </FluentLink>
  );
};
