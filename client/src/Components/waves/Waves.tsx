import React from 'react';
import wave_1 from '../../assets/wave_1.svg';
import wave_2 from '../../assets/wave_2.svg';
import styles from './waves.module.scss';

export default function Waves() {
  return (
    <div className={styles.container}>
      <img
        src={wave_1}
        className={styles.wave}
      />
      <img
        src={wave_2}
        className={`${styles.wave} ${styles.wave_2}}`}
      />
    </div>
  );
}
