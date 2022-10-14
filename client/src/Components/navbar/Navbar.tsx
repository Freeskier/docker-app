import React from 'react';
import styles from './navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.background}></div>
      Navbar
    </nav>
  );
}
