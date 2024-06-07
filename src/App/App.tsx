import styles from './App.module.scss';
import { useAuthFetchUserData } from '~/features/auth/hooks/useAuthFetchUserData';
import { Router } from '~/router/Router';
import { Spinner } from '~/ui/Spinner';

export function App() {
  const { isLoading } = useAuthFetchUserData();

  return (
    <>
      <Spinner isShow={isLoading} />
      {!isLoading && <Router />}
    </>
  );
}
