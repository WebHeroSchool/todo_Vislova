import React, { useState, useEffect } from 'react';
import styles from './Item.module.css';
import classnames from 'classnames';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Item = ({ value, isDone, onClickDone, id, onClickDelete, rewriteText, canChange, onClickChange}) => {

  const [item, setItem] = useState(value);
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onClickButton = (id) => {

    console.log(value)
    console.log(item)
    onClickChange(id, item)
  }
 
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
        {canChange 
        ? <div className={styles.textfield}>
          <TextField
            id={inputError ? "outlined-error-helper-text" : "outlined-full-width"}
            label={'Change'}
            style={{ margin: 8 }}
            placeholder="Добавь новую задачу"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={item}
            onChange={(event) =>
              setItem(event.target.value)
            }
            error={inputError}
          />
          <button
            onClick={() => onClickButton(id, item)}
            className={styles.button}>
            Изменить
          </button>
        </div>
        : <span onDoubleClick={() => rewriteText(id)}>{value}</span>}
      </div>
      <DeleteSharpIcon color="inherit" onClick={() => onClickDelete(id)} />
    </div>
  );
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
