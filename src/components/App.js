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
      { id: 3, value: 'Eще одно важное дело2', isDone: true },
      { id: 4, value: 'Eще одно важное дело3', isDone: true },
      { id: 5, value: 'Eще одно важное дело4', isDone: false },
    ],
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

  render() {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}> Важные дела: </h1>
        <InputItem />
        <ItemList items={this.state.items} onClickDone={this.onClickDone} />
        <Footer count={5} />
      </div>
    );
  }
}

export default App;
