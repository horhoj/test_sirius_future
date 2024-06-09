import classNames from 'classnames';
import { scheduleHelpers } from '../../helpers';
import styles from './LessonList.module.scss';
import { LessonContract } from '~/CONTRACTS/Gate.contracts';
import { WalletIcon } from '~/assets/icons';

interface LessonListProps {
  lessonList: LessonContract[];
}

const MS_IN_ONE_MINUTE = 1000 * 60;

export function LessonList({ lessonList }: LessonListProps) {
  return (
    <ul className={styles.LessonList}>
      {lessonList.map((lesson) => (
        <li
          key={lesson.id}
          className={classNames(
            styles.lesson,
            lesson.startUnixTime + lesson.lessonDurationInMinutes * MS_IN_ONE_MINUTE <
              scheduleHelpers.getCurrentUnixTime() && styles.complete,
            lesson.startUnixTime + lesson.lessonDurationInMinutes * MS_IN_ONE_MINUTE >
              scheduleHelpers.getCurrentUnixTime() &&
              styles.complete &&
              styles.isFuture,
          )}
        >
          <div className={classNames(styles.lessonTime, lesson.isCancelled && styles.lessonCancel)}>
            {scheduleHelpers.getTimeLabel(lesson.startUnixTime)}-
            {scheduleHelpers.getTimeLabel(lesson.startUnixTime + lesson.lessonDurationInMinutes * MS_IN_ONE_MINUTE)}
          </div>
          <div className={classNames(styles.lessonTitle, lesson.isCancelled && styles.lessonCancel)}>
            {lesson.disciplineTitle}
          </div>
          {lesson.isPaid && (
            <div className={styles.walletIcon}>
              <WalletIcon />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
