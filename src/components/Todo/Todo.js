import React, { useState, useEffect } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './Todo.module.css';

const Todo = () => {
  const initialState = {
    items: [
      { id: 1, value: 'Написать todo-приложение', isDone: false },
      { id: 2, value: 'Eще одно важное дело', isDone: false },
      { id: 3, value: 'Eще одно важное дело2', isDone: false },
      { id: 4, value: 'Eще одно важное дело3', isDone: false },
      { id: 5, value: 'Eще одно важное дело4', isDone: false },
    ],
    count: 5,
    error: false,
  };

  const [items, setItems] = useState(initialState.items);
  const [count, setCount] = useState(initialState.count);
  const [error, setError] = useState(initialState.error);

  useEffect(() => {
    console.log('componentDidMount');
  }, []);
  useEffect(() => {
    console.log('componentDidUpdate');
  }, [items]);

  const onClickDone = (id) => {
    const newItemList = items.map((item) => {
      const newItem = { ...item };

      if (item.id === id) {
        newItem.isDone = !item.isDone;
      }

      return newItem;
    });

    setItems(newItemList);
  };

  const onClickDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const onClickAdd = (value) => {
    if (value !== '') {
      const NewItemList = [
        ...items,
        {
          id: count + 1,
          value,
          isDone: false,
        },
      ];
      setCount((count) => count + 1);
      setItems(NewItemList);
    } else {
      setError((error) => !error);
    }
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}> Важные дела: </h1>
      <InputItem onClickAdd={onClickAdd} error={error} />
      <ItemList
        items={items}
        onClickDone={onClickDone}
        onClickDelete={onClickDelete}
      />
      <Footer count={count} />
    </div>
  );
};

export default Todo;
