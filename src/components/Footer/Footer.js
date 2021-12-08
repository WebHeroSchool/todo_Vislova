import React from 'react';
import styles from './Footer.module.css';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const Footer = ({ count, filterTodo }) => (
  <div>
    <div className={styles.buttons}>
      <Button
      onClick={() => filterTodo('all')}
      className={styles.button}
      variant="outlined" 
      color="inherit">
        Все дела
      </Button>
      <Button
      onClick={() => filterTodo('done')}
      className={styles.button}
      variant="outlined" 
      color="inherit">
        Выполненные
        </Button>
      <Button
      onClick={() => filterTodo('active')}
      className={styles.button}
      variant="outlined" 
      color="inherit">
        Не выполненные
        </Button>
    </div>
    <div className={styles.inner}>
      <div className={styles.text}>Осталось выполнить следующее количество дел:</div>{' '}
      <div className={styles.count}>{count}</div>
    </div>
  </div>
);

Footer.defaultProps = {
  count: 0,
};

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default Footer;
