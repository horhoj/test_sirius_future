import styles from './MainPage.module.scss';
import { authSlice } from '~/features/auth/store/authSlice';
import { WorkLayout } from '~/layouts/WorkLayout/WorkLayout';
import { useAppDispatch } from '~/store/hooks';
import { Button } from '~/ui/Button';

export function MainPage() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authSlice.thunks.logoutThunk());
  };

  return (
    <WorkLayout>
      <div>MainPage</div>
      <div>
        <Button onClick={handleLogout}>exit</Button>
      </div>
    </WorkLayout>
  );
}
