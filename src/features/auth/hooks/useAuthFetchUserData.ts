import { useEffect } from 'react';
import { authSlice } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const useAuthFetchUserData = () => {
  const dispatch = useAppDispatch();
  const fetchDataFirstAppRunRequest = useAppSelector((state) => state.auth.fetchDataFirstAppRunRequest);

  useEffect(() => {
    dispatch(authSlice.thunks.fetchDataFirstAppRunThunk());
  }, []);

  return {
    isLoading: fetchDataFirstAppRunRequest.isLoading,
  };
};
