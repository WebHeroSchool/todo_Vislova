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
      { id: 1, value: 'Написать todo-приложение', isDone: false, order: 1, canChange: false },
      { id: 2, value: 'Eще одно важное дело', isDone: false, order: 2, canChange: false },
      { id: 3, value: 'Eще одно важное дело2', isDone: false, order: 3, canChange: false },
      { id: 4, value: 'Eще одно важное дело3', isDone: false, order: 4, canChange: false },
      { id: 5, value: 'Eще одно важное дело4', isDone: false, order: 5, canChange: false },
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
          order: items.length + 1
        },
      ];
      setCount(count + 1);
      setItems(newItemList);
    } else {
      setError((error) => !error);
    }
  };

  const onClickChange = (id, item) => {
    const newItemList = items.map((i) => {
      const newItem = { ...i };
      if (newItem.id === id) {
        newItem.value = item;
      }
      newItem.canChange = false;
      return newItem;
    });
    console.log(newItemList);
    setItems(newItemList);
  }

  const [currentItem, setCurrent] = useState(null);

  const dragStartHandler = (e, item) => {
    setCurrent(item);
  }  

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  }

  const dragEndHandler = (e) => {
    e.preventDefault();
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e, item) => {
    e.preventDefault();
    const list = filterItems.map(i => {
      if(i.id === item.id) {
        return {...i, order: currentItem.order}
      }
      if(i.id === currentItem.id) {
        return {...i, order: item.order}
      }
      return i;
  });
    setItems(list);
    setFilterItems(list);
  } 

  const sortItems = (a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  }

  const rewriteText = (id) => {
    const newItemList = items.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.canChange = true;
      } else {
        newItem.canChange = false; 
      }
      return newItem;
    });
    setItems(newItemList);
  }

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
            items={filterItems.sort(sortItems)}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragEndHandler={dragEndHandler}
            dragOverHandler={dragOverHandler}
            dropHandler={dropHandler}
            rewriteText={rewriteText}
            onClickChange={onClickChange}
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
