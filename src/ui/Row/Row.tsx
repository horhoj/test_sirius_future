import classNames from 'classnames';
import styles from './Row.module.scss';

interface RowProps {
  children?: React.ReactNode;
  mt?: number;
  isCenter?: boolean;
}
export function Row({ children, mt = 0, isCenter = false }: RowProps) {
  return (
    <div className={classNames(styles.Row, isCenter && styles.center)} style={{ marginTop: `${mt}px` }}>
      {children}
    </div>
  );
}
