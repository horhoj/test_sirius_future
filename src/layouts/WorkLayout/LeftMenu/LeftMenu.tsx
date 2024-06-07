import { LeftMenuLink } from '../LeftMenuLink';
import styles from './LeftMenu.module.scss';
import {
  WorkLayoutLeftMenuAchievementsIcon,
  WorkLayoutLeftMenuLogo,
  WorkLayoutLeftMenuMainIcon,
  WorkLayoutLeftMenuPaymentIcon,
  WorkLayoutLeftMenuScheduleIcon,
  WorkLayoutLibraryIcon,
  WorkLayoutExerciseEquipmentIcon,
  WorkLayoutCheckConnectionIcon,
  WorkLayoutSettingsIcon,
  WorkLayoutQuestionsIcon,
} from '~/assets/icons';
import { routes } from '~/router/routes';

export function LeftMenu() {
  return (
    <div className={styles.LeftMenu}>
      <div className={styles.logo}>
        <WorkLayoutLeftMenuLogo />
      </div>
      <ul className={styles.linkList}>
        <li>
          <LeftMenuLink to={routes.MAIN} icon={WorkLayoutLeftMenuMainIcon} title={'Главная'} />
        </li>
        <li>
          <LeftMenuLink to={routes.SCHEDULE} icon={WorkLayoutLeftMenuScheduleIcon} title={'Расписание'} />
        </li>
        <li>
          <LeftMenuLink to={routes.PAYMENT} icon={WorkLayoutLeftMenuPaymentIcon} title={'Оплата'} />
        </li>
        <li>
          <LeftMenuLink to={routes.ACHIEVEMENTS} icon={WorkLayoutLeftMenuAchievementsIcon} title={'Достижения'} />
        </li>
        <li>
          <LeftMenuLink to={routes.EXERCISE_EQUIPMENT} icon={WorkLayoutExerciseEquipmentIcon} title={'Тренажеры'} />
        </li>
        <li>
          <LeftMenuLink to={routes.LIBRARY} icon={WorkLayoutLibraryIcon} title={'Библиотека'} />
        </li>
        <li>
          <LeftMenuLink to={routes.CHECK_CONNECTION} icon={WorkLayoutCheckConnectionIcon} title={'Проверка связи'} />
        </li>
        <li>
          <LeftMenuLink to={routes.SETTINGS} icon={WorkLayoutSettingsIcon} title={'Настройки'} />
        </li>
        <li>
          <LeftMenuLink to={routes.QUESTIONS} icon={WorkLayoutQuestionsIcon} title={'Вопросы'} />
        </li>
      </ul>
    </div>
  );
}
