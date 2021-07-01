import React from 'react';
import styles from './Footer.module.css';
import PropTypes from 'prop-types';

const Footer = ({ count }) => (
  <div className={styles.text}>
    Осталось выполнить следующее кол-во дел:{' '}
    <span className={styles.count}>{count}</span>
  </div>
);

Footer.defaultProps = {
  count: 0,
};

Footer.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Footer;
