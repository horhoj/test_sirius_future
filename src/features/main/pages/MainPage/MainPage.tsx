import { useEffect } from 'react';
import { MainPageBanner } from '../../components/MainPageBanner';
import { mainSlice } from '../../mainSlice';
import { NextLessonCounter } from '../../components/NextLessonCounter';
import { LessonBalance } from '../../components/LessonBalance';
import { NextLessonList } from '../../components/NextLessonList';
import styles from './MainPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { WorkLayout } from '~/layouts/WorkLayout/WorkLayout';

export function MainPage() {
  const dispatch = useAppDispatch();
  const profileDataRequest = useAppSelector((state) => state.main.profileDataRequest);

  useEffect(() => {
    dispatch(mainSlice.thunks.profileDataThunk());
  }, []);

  return (
    <WorkLayout isLoading={profileDataRequest.isLoading}>
      {profileDataRequest.data && (
        <>
          <div className={styles.top}>
            <MainPageBanner />
            <NextLessonCounter startUnixTime={profileDataRequest.data.nextLessons[0]?.startUnixTime ?? null} />
          </div>
          <div className={styles.bottom}>
            <LessonBalance balanceOfLessons={profileDataRequest.data.balanceOfLessons} />
            <NextLessonList nextLessons={profileDataRequest.data.nextLessons} />
          </div>
        </>
      )}
    </WorkLayout>
  );
}
