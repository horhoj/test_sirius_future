import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string;
  isFullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isFullWidth, ...props }, ref) => {
    return (
      <button {...props} className={classNames(styles.Button, className, isFullWidth && styles.fullWidth)} ref={ref}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
