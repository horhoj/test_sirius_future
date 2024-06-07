import classNames from 'classnames';
import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LeftMenuLink.module.scss';

interface LeftMenuLinkProps {
  to: ComponentProps<typeof NavLink>['to'];
  icon: (props: { fill: string }) => React.ReactNode;
  title: string;
}

const linkClassName = (isActive: boolean) => classNames(styles.link, isActive && styles.linkActive);
const makeColor = (isActive: boolean) => (isActive ? '#fff' : '#434B74');

export function LeftMenuLink({ to, icon, title }: LeftMenuLinkProps) {
  return (
    <NavLink to={to} className={styles.LeftMenuLink}>
      {({ isActive }) => (
        <div className={linkClassName(isActive)}>
          {icon({ fill: makeColor(isActive) })}
          <span className={classNames(styles.linkText, isActive && styles.linkTextActive)}>{title}</span>
        </div>
      )}
    </NavLink>
  );
}
