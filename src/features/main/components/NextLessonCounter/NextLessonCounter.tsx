import { mainHelpers } from '../../mainHelpers';
import styles from './NextLessonCounter.module.scss';
import { todo } from '~/utils/todo';

interface NextLessonCounterProps {
  startUnixTime: number | null;
}
export function NextLessonCounter({ startUnixTime }: NextLessonCounterProps) {
  const timeData = mainHelpers.getTimeIsLeft(startUnixTime);

  return (
    <div className={styles.NextLessonCounter}>
      <div className={styles.title}>Следующее занятие начнется через:</div>
      {timeData === null && <div>следующее занятие не назначено</div>}
      {timeData !== null && (
        <div className={styles.counter}>
          <span>{timeData.d}</span>д.<span>{timeData.h}</span>ч.
          <span>{timeData.m}</span>м.
        </div>
      )}
      <button className={styles.button} onClick={todo}>
        Button
      </button>
    </div>
  );
}
