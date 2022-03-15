import {React, useState, useEffect, useCallback} from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';
import PropTypes from 'prop-types';

const ItemList = ({ items, onClickDone, onClickDelete }) => {

  const [currentItem, setCurrent] = useState(null);
  const [itemList, setList] = useState(items);

  const dragStartHandler = (e, item) => {
    console.log('drag', item);
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
    setList(itemList.map(i => {
        if(i.id === item.id) {
          return {...i, order: currentItem.order}
        }
        if(i.id === currentItem.id) {
          return {...i, order: item.order}
        }
        return i;
    }))
    console.log('drop', item);
  }  

  const sortItems = (a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  }

  return <div>
    <ul className={styles.list}>
      {itemList.sort(sortItems).map((item) => (
        <li key={item.id}
          draggable="true" 
          onDragStart={(e) => dragStartHandler(e, item)} 
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)} 
          onDrop={(e) => dropHandler(e, item)}
        >
          <Item
            value={item.value}
            isDone={item.isDone}
            id={item.id}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
          />
        </li>
      ))}
    </ul>
  </div>
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onClickDone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default ItemList;
