import React from 'react';
import styles from './Item.module.css';
import classnames from 'classnames';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckIcon from '@material-ui/icons/Check';

const Item = ({ value, isDone, onClickDone, id }) => (
  <span
    className={classnames({
      [styles.item]: true,
      [styles.done]: isDone,
    })}
    onClick={() => onClickDone(id)}
  >
    <CheckIcon />
    <span>{value}</span>
    <DeleteSharpIcon />
  </span>
);

export default Item;
