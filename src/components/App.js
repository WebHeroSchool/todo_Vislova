import React from 'react';
import InputItem from './InputItem/InputItem';
import ItemList from './ItemList/ItemList';
import Footer from './Footer/Footer';

const count = 5;
const todoItem = 'Написать todo-приложение';

const App = () => (
  <div>
    <h1> todos </h1>
    <InputItem />
    <ItemList todoItem={todoItem} />
    <Footer count={count} />
  </div>
);

export default App;
