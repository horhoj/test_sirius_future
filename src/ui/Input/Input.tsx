import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import styles from './Input.module.scss';
import { PasswordHiddenIcon } from '~/assets/icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, isError = false, disabled, ...props }, ref) => {
    const [isPasswordShow, setIsPasswordShow] = useState(true);

    const handlePasswordShowToggle = () => {
      setIsPasswordShow((prev) => !prev);
    };

    let inputType = type;
    if (type === 'password' && !isPasswordShow) {
      inputType = 'text';
    }

    return (
      <span className={styles.inputWrapper}>
        {type === 'password' && (
          <button
            className={styles.passwordShowToggleIcon}
            onClick={handlePasswordShowToggle}
            type={'button'}
            disabled={disabled}
            tabIndex={-1}
          >
            <PasswordHiddenIcon isHidden={isPasswordShow} />
          </button>
        )}

        <input
          {...props}
          type={inputType}
          className={classNames(
            styles.Input,
            className,
            isError && styles.isError,
            type === 'password' && styles.isPassword,
          )}
          ref={ref}
          disabled={disabled}
        ></input>
      </span>
    );
  },
);

Input.displayName = 'Input';
