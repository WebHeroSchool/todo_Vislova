import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ count }) => (
  <div className={styles.text}>
    Осталось выполнить следующее кол-во дел:{' '}
    <span className={styles.count}>{count}</span>
  </div>
);

export default Footer;
