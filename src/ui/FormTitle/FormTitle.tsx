import styles from './FormTitle.module.scss';

interface FormTitleProps {
  children?: React.ReactNode;
}
export function FormTitle({ children }: FormTitleProps) {
  return <div className={styles.FormTitle}>{children}</div>;
}
