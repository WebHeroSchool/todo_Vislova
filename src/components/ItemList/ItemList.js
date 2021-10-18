import React, { useState } from 'react';
import { useCallback } from 'react';
import Item from './Item/Item';
import styles from './ItemList.module.css';
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider} from 'react-dnd';
import update from 'immutability-helper';

const ItemList = (props) => {
  const [items, setItems] = useState(props);
  const {onClickDone, onClickDelete} = props;

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    setItems(update(items, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
        ],
    }));
}, [items]);

console.log(items)

  return <div>
    <DndProvider backend={HTML5Backend}>
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <Item
            value={item.value}
            isDone={item.isDone}
            id={item.id}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete}
            moveItem={moveItem}
          />
        </li>
      ))}
    </ul>
		</DndProvider>
  </div>
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onClickDone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default ItemList;
