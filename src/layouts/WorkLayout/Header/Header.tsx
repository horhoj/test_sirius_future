import { HeaderMessages } from '../HeaderMessages';
import { HeaderProfile } from '../HeaderProfile';
import { WelcomeMessage } from '../WelcomeMessage';
import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div>
          <WelcomeMessage />
        </div>
        <div className={styles.rightBlock}>
          <HeaderMessages />
          <HeaderProfile />
        </div>
      </div>
    </div>
  );
}
