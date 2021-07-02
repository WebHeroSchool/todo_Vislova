import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import Todo from './Todo/Todo';
import About from './About/About';
import Contacts from './Contacts/Contacts';

const App = () => {
  return (
    <Router>
      <nav className={styles.wrap}>
        <Link to="/" className={styles.title}>
          Обо мне
        </Link>
        <Link to="/todo" className={styles.title}>
          Дела
        </Link>
        <Link to="/contacts" className={styles.title}>
          Контакты
        </Link>
      </nav>
      <Route path="/" exact component={About} />
      <Route path="/todo" component={Todo} />
      <Route path="/contacts" component={Contacts} />
    </Router>
  );
};

export default App;
