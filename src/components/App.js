import React from 'react';
import InputItem from './InputItem/InputItem';
import ItemList from './ItemList/ItemList';
import Footer from './Footer/Footer';
import './App.css';

const count = 5;

const items = [
  { id: 1, value: 'Написать todo-приложение' },
  { id: 2, value: 'Eще одно важное дело' },
  { id: 3, value: 'Eще одно важное дело2' },
  { id: 4, value: 'Eще одно важное дело3' },
  { id: 5, value: 'Eще одно важное дело4' },
];

const App = () => (
  <div className="wrap">
    <h1 className="wrap__title"> todos </h1>
    <InputItem />
    <ItemList items={items} />
    <Footer count={count} />
  </div>
);

export default App;
