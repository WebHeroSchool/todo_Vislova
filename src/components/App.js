import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import Todo from './Todo/Todo';
import About from './About/About';
import Contacts from './Contacts/Contacts';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Router className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Обо мне
          </Link>
          <Link to="/todo" className={styles.link}>
            Дела
          </Link>
          <Link to="/contacts" className={styles.link}>
            Контакты
          </Link>
        </nav>
        <Route path="/" exact component={About} />
        <Route path="/todo" component={Todo} />
        <Route path="/contacts" component={Contacts} />
      </Router>
    </div>
    
  );
};

export default App;
