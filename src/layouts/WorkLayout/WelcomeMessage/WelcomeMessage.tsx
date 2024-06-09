import { useLocation } from 'react-router-dom';
import styles from './WelcomeMessage.module.scss';
import { useAppSelector } from '~/store/hooks';
import { routes } from '~/router/routes';

export function WelcomeMessage() {
  const fetchUserDataRequest = useAppSelector((state) => state.auth.fetchUserDataRequest);
  const location = useLocation();

  return (
    <>
      {fetchUserDataRequest.data && location.pathname === routes.MAIN && (
        <div className={styles.WelcomeMessage}>
          Добро пожаловать, <span className={styles.userName}>{fetchUserDataRequest.data.name}</span>!
        </div>
      )}
    </>
  );
}
