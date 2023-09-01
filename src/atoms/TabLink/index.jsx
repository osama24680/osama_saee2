import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './style.module.css';

const TabLink = ({ tab, solid, icon = null }) => {
  const router = useRouter();

  return (
    <Link
      href={tab.link}
      className={`${styles.TabLink} ${
        router.pathname.includes(tab.name) ? styles.active : ''
      } ${solid ? styles.solid : ''}`}
    >
      {icon}

      {tab.title}
    </Link>
  );
};

export default TabLink;
