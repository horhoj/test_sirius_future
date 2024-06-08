import { useState } from 'react';
import styles from './HeaderProfile.module.scss';
import { HeaderProfileArrowDownIcon, HeaderProfileExitIcon } from '~/assets/icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { authSlice } from '~/features/auth/store/authSlice';

export function HeaderProfile() {
  const [open, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleExit = () => {
    dispatch(authSlice.thunks.logoutThunk());
  };

  const fetchUserDataRequest = useAppSelector((state) => state.auth.fetchUserDataRequest);

  return (
    <div className={styles.HeaderProfile}>
      <button className={styles.arrowDown} onClick={() => setIsOpen((prev) => !prev)}>
        <HeaderProfileArrowDownIcon />
      </button>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.title}>Смена пользователя</div>
          <div>{JSON.stringify(fetchUserDataRequest.data, null, 2)}</div>
          <div>
            <button className={styles.exitButton} onClick={handleExit}>
              <span className={styles.exitButtonLabel}>Выход</span>
              <HeaderProfileExitIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
