import { Header } from './Header';
import { LeftMenu } from './LeftMenu';
import styles from './WorkLayout.module.scss';
import { Spinner } from '~/ui/Spinner';

interface WorkLayoutProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}
export function WorkLayout({ children, isLoading = false }: WorkLayoutProps) {
  return (
    <>
      <Spinner isShow={isLoading} />
      <div className={styles.WorkLayout}>
        <div className={styles.leftBlock}>
          <LeftMenu />
        </div>
        <div className={styles.rightBlock}>
          <Header />

          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </>
  );
}
