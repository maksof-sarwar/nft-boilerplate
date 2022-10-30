import styles from '../styles/index.module.scss';
import Account from '../components/Account';

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <Account />
      </div>
    </div>
  );
}

export default Index;
