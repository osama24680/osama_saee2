import { useState } from 'react';
import { useRouter } from 'next/router';

import TabLink from 'src/atoms/TabLink';

import SolidArrowIcon from 'src/assets/icons/SolidArrowIcon';
import ArrowIcon from 'src/assets/icons/ArrowIcon';

import styles from './style.module.css';

function Dropdown({ tabs, title }) {
  const router = useRouter();

  const shouldOpen = tabs.find(tab => router.pathname.includes(tab.name));

  const [IsOpen, setIsOpen] = useState(shouldOpen);

  const tabsList = tabs.map(tab => (
    <TabLink
      key={tab.id}
      tab={tab}
      icon={<SolidArrowIcon />}
    />
  ));

  return (
    <div className={styles.Dropdown}>
      <div
        className={styles.title}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {title}

        <span
          style={{
            transform: IsOpen ? 'rotate(180deg)' : '',
          }}
        >
          <ArrowIcon
            style={{
              backgroundColor: 'red',
            }}
          />
        </span>
      </div>

      {tabs && IsOpen && <div className={styles.list}>{tabsList}</div>}
    </div>
  );
}

export default Dropdown;
