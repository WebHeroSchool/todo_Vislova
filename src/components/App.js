import React from 'react';
import InputItem from './InputItem/InputItem';
import ItemList from './ItemList/ItemList';
import Footer from './Footer/Footer';

const App = () => (
  <div>
    <h1> todos </h1>
    <InputItem />
    <ItemList />
    <Footer />
  </div>
);

export default App;
