import { Link } from 'react-router-dom';
import styles from './LeftMenuBanner.module.scss';
import { WorkLayoutLeftMenuBanner } from '~/assets/icons';

interface LeftMenuBannerProps {
  children?: React.ReactNode;
}
export function LeftMenuBanner({ children }: LeftMenuBannerProps) {
  return (
    <div className={styles.LeftMenuBanner}>
      <div className={styles.title}>Учитесь бесплатно</div>
      <div className={styles.text}>Приводите друзей с детьми заниматься в Sirius Future и получайте подарки!</div>
      <div className={styles.bannerIcon}>
        <WorkLayoutLeftMenuBanner />
      </div>
      <div className={styles.buttonWrapper}>
        <Link to={'#'} className={styles.link}>
          Узнать
        </Link>
      </div>
    </div>
  );
}
