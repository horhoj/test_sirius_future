import styles from './MainPageBanner.module.scss';
import mainPageBannerImage from '~/assets/mainPageBannerImage.png';

export function MainPageBanner() {
  return (
    <div className={styles.MainPageBanner}>
      <div className={styles.title}>До 31 декабря любой курс со скидкой 20%</div>
      <div className={styles.text}>
        До конца года у вас есть уникальная возможность воспользоваться нашей новогодней скидкой 20% на любой курс!
      </div>
      <img src={mainPageBannerImage} className={styles.img} alt={mainPageBannerImage} />
    </div>
  );
}
