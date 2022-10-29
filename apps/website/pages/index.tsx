import styles from '../styles/index.module.scss';
import Mint from '@armorsclub/apps/website/components/Mint';

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <Mint />
      </div>
    </div>
  );
}

export default Index;
