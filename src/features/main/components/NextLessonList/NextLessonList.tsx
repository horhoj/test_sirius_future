import { mainHelpers } from '../../mainHelpers';
import styles from './NextLessonList.module.scss';
import { LessonContract } from '~/CONTRACTS/Gate.contracts';
import { todo } from '~/utils/todo';
import { NextLessonListUserIcon } from '~/assets/icons';

interface NextLessonListProps {
  nextLessons: LessonContract[];
}

const MS_IN_MINUTE = 1000 * 60;

export function NextLessonList({ nextLessons }: NextLessonListProps) {
  return (
    <div className={styles.NextLessonList}>
      <div className={styles.title}>Ближайшие уроки</div>
      <ul className={styles.list}>
        {nextLessons.map((lesson) => (
          <li key={lesson.id} className={styles.item}>
            <div className={styles.dateWrapper}>
              <div className={styles.date}>{mainHelpers.getDate(lesson.startUnixTime)}</div>
              <div className={styles.month}>{mainHelpers.getMonthLabel(lesson.startUnixTime)}</div>
            </div>
            <div className={styles.itemTitle}>{lesson.disciplineTitle}</div>
            <div className={styles.itemTime}>
              {mainHelpers.getTimeLabel(lesson.startUnixTime)}-
              {mainHelpers.getTimeLabel(lesson.startUnixTime + lesson.lessonDurationInMinutes * MS_IN_MINUTE)}
            </div>
            <div className={styles.itemUnknown}>
              <NextLessonListUserIcon /> Чье-то ФИО??
            </div>
            <div className={styles.itemButtonsWrapper}>
              <button className={styles.itemFirstButton} onClick={todo}>
                button
              </button>
              <button className={styles.itemSecondButton} onClick={todo}>
                button
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={todo}>
          Button
        </button>
      </div>
    </div>
  );
}
