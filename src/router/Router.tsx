import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { LoginPage } from '~/features/auth/pages/LoginPage';
import { ProtectedRoute } from '~/features/auth/components/ProtectedRoute';
import { MainPage } from '~/features/main/pages/MainPage';
import { SchedulePage } from '~/features/schedule/pages/SchedulePage';
import { MockPage } from '~/features/mock/pages/MockPage';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginPage />} />

        <Route
          path={routes.MAIN}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.SCHEDULE}
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.PAYMENT}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница оплаты'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.ACHIEVEMENTS}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница достижений'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.EXERCISE_EQUIPMENT}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница тренажеров'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.LIBRARY}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница библиотеки'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.CHECK_CONNECTION}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница проверки связи'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.SETTINGS}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница настроек'} />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.QUESTIONS}
          element={
            <ProtectedRoute>
              <MockPage title={'Моковая страница вопросов'} />
            </ProtectedRoute>
          }
        />

        <Route path={'*'} element={<Navigate to={routes.MAIN} replace={true} />} />
      </Routes>
    </>
  );
}
