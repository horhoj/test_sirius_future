import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '~/router/routes';
import { useAppSelector } from '~/store/hooks';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from ?? routes.MAIN;
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const authRedirect = () => {
    navigate(redirectPath, { replace: true });
  };

  useEffect(() => {
    if (isAuth) {
      authRedirect();
    }
  }, [isAuth, redirectPath]);

  return { authRedirect };
};
