import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './InputItem.module.css';
import PropTypes from 'prop-types';

class InputItem extends React.Component {
  state = {
    InputValue: '',
  };

  onClickButton = () => {
    this.props.onClickAdd(this.state.InputValue);
    this.setState({ InputValue: '' });
  };

  render() {
    return (
      <div className={styles.wrap}>
        <TextField
          id="outlined-full-width"
          label={'New task'}
          style={{ margin: 8 }}
          placeholder="Добавь новую задачу"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={this.state.InputValue}
          onChange={(event) =>
            this.setState({ InputValue: event.target.value.toUpperCase() })
          }
          helperText={this.props.error ? 'Пустое поле' : ''}
          color={this.props.error ? 'secondary' : 'primary'}
        />
        <Button variant="contained" onClick={this.onClickButton}>
          Добавить задачу
        </Button>
      </div>
    );
  }
}

InputItem.propTypes = {
  onClickButton: PropTypes.func,
  onClickAdd: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default InputItem;
