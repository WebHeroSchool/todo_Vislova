import React from 'react';
import styles from './Item.module.css';
import classnames from 'classnames';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Checkbox } from '@material-ui/core';
//import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

class Item extends React.Component {
  render() {
    const { value, isDone, onClickDone, id, onClickDelete } = this.props;
    return (
      <div
        className={classnames({
          [styles.item]: true,
          [styles.done]: isDone,
        })}
      >
        <div className={styles.inner}>
          <Checkbox
            name="checkedB"
            color="default"
            onClick={() => onClickDone(id)}
            className={styles.checkbox}
            checked={isDone}
          />
          <span>{value}</span>
        </div>
        <DeleteSharpIcon color="inherit" onClick={() => onClickDelete(id)} />
      </div>
    );
  }
}

Item.defaultProps = {
  value: 'Задача',
  isDone: false,
};

Item.propTypes = {
  value: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onClickDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default Item;
