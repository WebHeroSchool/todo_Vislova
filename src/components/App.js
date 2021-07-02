import React from 'react';
import InputItem from './InputItem/InputItem';
import ItemList from './ItemList/ItemList';
import Footer from './Footer/Footer';
import styles from './App.module.css';

class App extends React.Component {
  state = {
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

  onClickDone = (id) => {
    const newItemList = this.state.items.map((item) => {
      const newItem = { ...item };

      if (item.id === id) {
        newItem.isDone = !item.isDone;
      }

      return newItem;
    });

    this.setState({ items: newItemList });
  };

  onClickDelete = (id) => {
    const newItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: newItems });
  };

  onClickAdd = (value) => {
    if (value !== '') {
      this.setState((state) => ({
        items: [
          ...state.items,
          {
            id: state.count + 1,
            value,
            isDone: false,
          },
        ],

        count: state.count + 1,
        error: false,
      }));
    } else {
      this.setState((state) => ({
        error: true,
      }));
    }
  };

  render() {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}> Важные дела: </h1>
        <InputItem onClickAdd={this.onClickAdd} error={this.state.error} />
        <ItemList
          items={this.state.items}
          onClickDone={this.onClickDone}
          onClickDelete={this.onClickDelete}
        />
        <Footer count={this.state.count} />
      </div>
    );
  }
}

export default App;
