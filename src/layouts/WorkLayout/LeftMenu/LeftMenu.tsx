import { LeftMenuBanner } from '../LeftMenuBanner';
import { LeftMenuLink } from '../LeftMenuLink';
import styles from './LeftMenu.module.scss';
import {
  WorkLayoutLeftMenuAchievementsIcon,
  WorkLayoutLeftMenuLogo,
  WorkLayoutLeftMenuMainIcon,
  WorkLayoutLeftMenuPaymentIcon,
  WorkLayoutLeftMenuScheduleIcon,
  WorkLayoutLeftMenuLibraryIcon,
  WorkLayoutLeftMenuExerciseEquipmentIcon,
  WorkLayoutLeftMenuCheckConnectionIcon,
  WorkLayoutLeftMenuSettingsIcon,
  WorkLayoutLeftMenuQuestionsIcon,
} from '~/assets/icons';
import { routes } from '~/router/routes';

export function LeftMenu() {
  return (
    <div className={styles.LeftMenu}>
      <div>
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
            <LeftMenuLink
              to={routes.EXERCISE_EQUIPMENT}
              icon={WorkLayoutLeftMenuExerciseEquipmentIcon}
              title={'Тренажеры'}
            />
          </li>
          <li>
            <LeftMenuLink to={routes.LIBRARY} icon={WorkLayoutLeftMenuLibraryIcon} title={'Библиотека'} />
          </li>
          <li>
            <LeftMenuLink
              to={routes.CHECK_CONNECTION}
              icon={WorkLayoutLeftMenuCheckConnectionIcon}
              title={'Проверка связи'}
            />
          </li>
          <li>
            <LeftMenuLink to={routes.SETTINGS} icon={WorkLayoutLeftMenuSettingsIcon} title={'Настройки'} />
          </li>
          <li>
            <LeftMenuLink to={routes.QUESTIONS} icon={WorkLayoutLeftMenuQuestionsIcon} title={'Вопросы'} />
          </li>
        </ul>
      </div>
      <div className={styles.bannerWrapper}>
        <LeftMenuBanner />
      </div>
    </div>
  );
}
