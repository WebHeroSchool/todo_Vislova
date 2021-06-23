import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputItem = () => (
  <div>
    <TextField
      id="outlined-full-width"
      label="New task"
      style={{ margin: 8 }}
      placeholder="Добавь новую задачу"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
  </div>
);

export default InputItem;
