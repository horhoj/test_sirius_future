import styles from './AuthLayout.module.scss';
import { Spinner } from '~/ui/Spinner';

interface AuthLayoutProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}
export function AuthLayout({ children, isLoading = false }: AuthLayoutProps) {
  return (
    <>
      <Spinner isShow={isLoading} />
      <div className={styles.AuthLayoutsWrapper}>
        <div className={styles.AuthLayouts}>{children}</div>
      </div>
    </>
  );
}
