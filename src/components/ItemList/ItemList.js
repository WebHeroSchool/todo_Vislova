import React from 'react';
import Item from './Item/Item';

const ItemList = ({ todoItem }) => (
  <ul>
    <Item todoItem={todoItem} />
    <Item todoItem="Eще одно важное дело" />
    <Item todoItem="Eще одно важное дело2" />
    <Item todoItem="Eще одно важное дело3" />
    <Item todoItem="Eще одно важное дело4" />
  </ul>
);

export default ItemList;
