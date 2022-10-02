import React from 'react';
import Particles from '../particles/Particles';
import styles from './background.module.scss';

export default function () {
  return (
    <div className={styles.container}>
      <Particles />
    </div>
  );
}
