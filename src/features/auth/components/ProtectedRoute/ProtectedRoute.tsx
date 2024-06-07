import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '~/router/routes';
import { useAppSelector } from '~/store/hooks';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace={true} />;
  }
  return children;
}
