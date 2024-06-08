import { MainPageBanner } from '../../components/MainPageBanner';
import styles from './MainPage.module.scss';
import { WorkLayout } from '~/layouts/WorkLayout/WorkLayout';

export function MainPage() {
  return (
    <WorkLayout>
      <div>
        <MainPageBanner />
      </div>
      <div></div>
    </WorkLayout>
  );
}
