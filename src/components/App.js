import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import Todo from './Todo/Todo';
import About from './About/About';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Router className={styles.container}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.link} activeClassName={styles.active} exact>
            Обо мне
          </NavLink>
          <NavLink to="/todo" className={styles.link} activeClassName={styles.active} exact>
            Дела
          </NavLink>
        </nav>
        <Route path="/" exact component={About} />
        <Route path="/todo" component={Todo} />
      </Router>
    </div>
    
  );
};

export default App;
