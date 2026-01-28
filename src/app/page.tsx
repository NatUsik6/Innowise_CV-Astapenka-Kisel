import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to User Management</h1>
        <Link href="/users">
          Go to Users Page
        </Link>
      </main>
    </div>
  );
}