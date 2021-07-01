import React from 'react';
import styles from './Item.module.css';
import classnames from 'classnames';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

const Item = ({ value, isDone, onClickDone, id, onClickDelete }) => (
  <span
    className={classnames({
      [styles.item]: true,
      [styles.done]: isDone,
    })}
  >
    <Checkbox name="checkedB" color="default" onClick={() => onClickDone(id)} />
    <span>{value}</span>
    <DeleteSharpIcon onClick={() => onClickDelete(id)} />
  </span>
);

Item.defaultProps = {
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
