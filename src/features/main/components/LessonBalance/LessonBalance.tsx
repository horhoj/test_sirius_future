import styles from './LessonBalance.module.scss';
import { todo } from '~/utils/todo';
import { balanceOfLessonContract } from '~/CONTRACTS/Gate.contracts';

interface LessonBalanceProps {
  balanceOfLessons: balanceOfLessonContract[];
}
export function LessonBalance({ balanceOfLessons }: LessonBalanceProps) {
  return (
    <div className={styles.LessonBalance}>
      <div className={styles.title}>Баланс занятий</div>
      <ul className={styles.list}>
        {balanceOfLessons.map((el) => (
          <li key={el.disciplineId} className={styles.item}>
            <div className={styles.itemLabel}>{el.disciplineTitle}</div>
            <div className={styles.itemCount}>{el.count}</div>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={todo}>
        Button
      </button>
    </div>
  );
}
