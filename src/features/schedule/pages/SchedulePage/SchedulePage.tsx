import { Calendar } from '../../components/Calendar';
import { scheduleSelectors } from '../../scheduleSlice';
import { Discipline } from '../../components/Discipline';
import styles from './SchedulePage.module.scss';
import { useAppSelector } from '~/store/hooks';
import { WorkLayout } from '~/layouts/WorkLayout/WorkLayout';
import { todo } from '~/utils/todo';

export function SchedulePage() {
  const isLoading = useAppSelector(scheduleSelectors.isLoadingSelector);

  return (
    <WorkLayout isLoading={isLoading}>
      <div className={styles.top}>
        <Discipline />
        <button className={styles.changeScheduleButton} onClick={todo}>
          Изменить расписание
        </button>
      </div>
      <Calendar />
    </WorkLayout>
  );
}
