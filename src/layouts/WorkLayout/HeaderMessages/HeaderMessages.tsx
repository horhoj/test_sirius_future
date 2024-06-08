import styles from './HeaderMessages.module.scss';
import { HeaderMessagesIcon } from '~/assets/icons';

export function HeaderMessages() {
  return (
    <div className={styles.HeaderMessages}>
      <HeaderMessagesIcon />
      <div className={styles.counter}>2</div>
    </div>
  );
}
