import React from 'react';
import ReactDOM from 'react-dom';

const ItemList = () => (
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
);

const App = () => (
  <div>
    <h1>Заголовок для нашего приложения</h1>
    <ItemList />
  </div>
);

export default App;
