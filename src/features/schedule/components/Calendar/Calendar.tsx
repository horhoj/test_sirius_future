import { memo, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { scheduleHelpers } from '../../helpers';
import { scheduleSelectors, scheduleSlice } from '../../scheduleSlice';
import { LessonList } from '../LessonList';
import styles from './Calendar.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { ScheduleBackArrowIcon, ScheduleNexArrowIcon } from '~/assets/icons';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function CalendarComponent() {
  const dispatch = useAppDispatch();
  const currentUnixDate = useAppSelector((state) => state.schedule.currentUnixDate);

  const dateList = useAppSelector(scheduleSelectors.dateListSelector);
  const monthLabel = useMemo(() => scheduleHelpers.getMonthLabel(currentUnixDate), [currentUnixDate]);

  const fetchLessonsRequest = useAppSelector((state) => state.schedule.fetchLessonsRequest);

  useEffect(() => {
    dispatch(scheduleSlice.thunks.fetchLessonsThunk({ type: 'current' }));
  }, []);

  const handleNextMonth = () => {
    dispatch(scheduleSlice.thunks.fetchLessonsThunk({ type: 'next' }));
  };

  const handlePrevMonth = () => {
    dispatch(scheduleSlice.thunks.fetchLessonsThunk({ type: 'prev' }));
  };

  const handleToday = () => {
    dispatch(scheduleSlice.thunks.fetchLessonsThunk({ type: 'today' }));
  };

  const lessonsMap = useMemo(
    () => scheduleHelpers.fetchLessonsMapper(fetchLessonsRequest.data),
    [fetchLessonsRequest.data],
  );

  return (
    <div className={styles.Calendar}>
      <div className={styles.dateSelectWrapper}>
        <div className={styles.monthToggle}>
          <button onClick={handlePrevMonth} className={styles.monthButton} disabled={fetchLessonsRequest.isLoading}>
            <ScheduleBackArrowIcon />
          </button>
          {monthLabel}
          <button onClick={handleNextMonth} className={styles.monthButton} disabled={fetchLessonsRequest.isLoading}>
            <ScheduleNexArrowIcon />
          </button>
        </div>
        <div>
          <button className={styles.todayButton} onClick={handleToday} disabled={fetchLessonsRequest.isLoading}>
            Сегодня
          </button>
        </div>
      </div>
      <div className={styles.dateColumnHeadList}>
        {DAYS.map((day) => (
          <div key={day} className={styles.dateColumnHead}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.dateList}>
        {dateList.map((el) => {
          const { month, date } = el;
          const id = scheduleHelpers.getLessonMapId({ month, day: date });
          return (
            <div key={el.id} className={styles.dateItem}>
              <div className={classNames(styles.dateTitle, !el.isMonthSame && styles.dateTitleNotSelectedMonth)}>
                {el.date}
              </div>
              {lessonsMap !== null && lessonsMap[id] && <LessonList lessonList={lessonsMap[id]} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Calendar = memo(CalendarComponent);
