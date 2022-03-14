import React, { useState, useEffect } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './Todo.module.css';
import { fadeInRight, slideInRight } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const stylesAnimate = StyleSheet.create({
  fadeInRight: {
    animationName: fadeInRight,
    animationDuration: '1s'
  },
  slideInRight: {
    animationName: slideInRight,
    animationDuration: '1s'
  },
})

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
  const [filterItems, setFilterItems] = useState(initialState.items);
  const [status, setStatus] = useState('all')

  const filterTodo = (status) => {
    setStatus(status);
  }

  useEffect(() => {
    console.log('componentDidMount');
  }, []);
  useEffect(() => {
    console.log('componentDidUpdate');
  }, [items]);
  useEffect(() => {
    console.log('filterItems DidUpdate');
  }, [filterItems]);



  const onClickDone = (id) => {
    const newItemList = items.map((item) => {
      const newItem = { ...item };

      if (item.id === id) {
        if (item.isDone) {
          setCount(count + 1);
        } else {
          setCount(count - 1);
        }
        newItem.isDone = !item.isDone;
      }
      return newItem;
    });
    setItems(newItemList);
  };

  const onClickDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    items.forEach((item) => {
      if(item.id === id) {
        if (!item.isDone) {
          setCount(count - 1);
        }
      }
    });
    setItems(newItems);
  };

  const onClickAdd = (value) => {
    if (value !== '') {
      const newItemList = [
        ...items,
        {
          id: Math.round(new Date() * Math.random()),
          value,
          isDone: false,
        },
      ];
      setCount(count + 1);
      setItems(newItemList);
    } else {
      setError((error) => !error);
    }
  };

  useEffect(() => {
    let res = [];
    switch(status) {
      case 'all': 
        res = items;
        break;
      case 'done': 
        res = items.filter(item => item.isDone);
        break;
      case 'active': 
        res = items.filter(item => !item.isDone);
        break;
      default: res = items;
    }
    setFilterItems(res);
  }, [status, items])

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={css(stylesAnimate.fadeInRight)}><h2 className={styles.title}> Список дел: </h2></div>
        
        <div className={css(stylesAnimate.slideInRight)}>
          <InputItem onClickAdd={onClickAdd} error={error}  items={items} />
          <ItemList
            items={filterItems}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
          />
          <Footer 
            count={count}
            filterTodo={filterTodo}
          />
      </div>
      </div>
    </div>
  );
};

export default Todo;
