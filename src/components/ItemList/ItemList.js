import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';
import PropTypes from 'prop-types';

const ItemList = ({ items, onClickDone, onClickDelete, dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler, rewriteText, onClickChange }) => {

  return <div>
    <ul className={styles.list}>
      {items.map((item) => (
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
            canChange = {item.canChange}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
            rewriteText={rewriteText}
            onClickChange={onClickChange}
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
