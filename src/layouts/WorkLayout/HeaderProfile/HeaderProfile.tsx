import { useState } from 'react';
import styles from './HeaderProfile.module.scss';
import { HeaderProfileArrowDownIcon, HeaderProfileExitIcon } from '~/assets/icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { authSlice } from '~/features/auth/store/authSlice';
import { todo } from '~/utils/todo';

export function HeaderProfile() {
  const [open, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleExit = () => {
    dispatch(authSlice.thunks.logoutThunk());
  };

  const fetchUserDataRequest = useAppSelector((state) => state.auth.fetchUserDataRequest);
  const firstChar = fetchUserDataRequest.data?.name[0] ?? '#';

  const handleOpenToggle = () => {
    if (fetchUserDataRequest.data === null) {
      return;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.HeaderProfile}>
      {firstChar}
      <button className={styles.arrowDown} onClick={handleOpenToggle}>
        <HeaderProfileArrowDownIcon />
      </button>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.title}>Смена пользователя</div>
          <div className={styles.currentUserWrapper} onClick={todo}>
            <div className={styles.currentUserAvatar}>{firstChar}</div>
            <div>
              <div className={styles.currentUserName}>{fetchUserDataRequest.data?.name}</div>
              <div>Это вы</div>
            </div>
          </div>
          <div className={styles.currentUserWrapper} onClick={todo}>
            <div className={styles.currentUserAvatar}>А</div>
            <div>
              <div className={styles.currentUserName}>Анна</div>
              <div>Другой пользователь</div>
            </div>
          </div>

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
