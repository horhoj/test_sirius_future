import { AnchorHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode | string;
  isIcon?: boolean;
  to: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, isIcon = false, ...props }, ref) => {
    return (
      <ReactRouterLink {...props} className={classNames(styles.Link, className, isIcon && styles.isIcon)} ref={ref}>
        {children}
      </ReactRouterLink>
    );
  },
);

Link.displayName = 'Link';
