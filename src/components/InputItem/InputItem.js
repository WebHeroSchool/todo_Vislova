import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './InputItem.module.css';
import PropTypes from 'prop-types';

class InputItem extends React.Component {
  state = {
    inputValue: '',
    inputError: false,
    errorText: '',
  };

  onClickButton = () => {
    this.setState({
      inputValue: '',
      inputError: false
    });

    const {items, onClickAdd} = this.props;
    let inputError = false;

    items.forEach(item => {
      if(item.value === this.state.inputValue) {
          inputError = true
      }
    });

    if(this.state.inputValue === '' || inputError) {
      this.setState({
        inputError: true,
        errorText: inputError ? 'Такое дело уже добавлено' : 'Пустое поле'
      })
    } else{
      this.setState({
          inputValue: '',
          inputError: false
      });

    onClickAdd(this.state.inputValue);
  }
  };

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.textfield}>
          <TextField
            id={this.state.inputError ? "outlined-error-helper-text" : "outlined-full-width"}
            label={'New task'}
            style={{ margin: 8 }}
            placeholder="Добавь новую задачу"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.inputValue}
            onChange={(event) =>
              this.setState({inputValue: event.target.value})
            }
            error={this.state.inputError}
          />
            {(this.state.inputError) && <div className={styles.error}>{this.state.errorText}</div>}
        </div>
        <Button 
          variant="outlined" 
          color="inherit"
          onClick={this.onClickButton}
          onKeyPress={this.onClickButton}
          className={styles.button}>
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
