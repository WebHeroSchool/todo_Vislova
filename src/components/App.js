import React from 'react';
import InputItem from './InputItem/InputItem';
import ItemList from './ItemList/ItemList';
import Footer from './Footer/Footer';
import styles from './App.module.css';

const count = 5;

const items = [
  { id: 1, value: 'Написать todo-приложение', isDone: false },
  { id: 2, value: 'Eще одно важное дело', isDone: false },
  { id: 3, value: 'Eще одно важное дело2', isDone: true },
  { id: 4, value: 'Eще одно важное дело3', isDone: true },
  { id: 5, value: 'Eще одно важное дело4', isDone: false },
];

const App = () => (
  <div className={styles.wrap}>
    <h1 className={styles.title}> todos </h1>
    <InputItem />
    <ItemList items={items} />
    <Footer count={count} />
  </div>
);

export default App;
