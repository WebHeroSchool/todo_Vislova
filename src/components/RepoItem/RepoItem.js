import React from 'react';
import styles from './RepoItem.module.css';
import classNames from "classnames";
import PropTypes from 'prop-types';

class RepoItem extends React.Component {
  render() {
    const { repo } = this.props;
    return (
      <div className={styles.repo__item}>
        <div>
          <span className={styles.repo__name}>{repo.name}</span>
          <div className={styles.repo__inner}>
          <span className={styles.repo__language}>
            <span className={
                    repo.language === null
                    ? repo.language = 'nothing'
                      :
                    classNames({
                      [styles.icon]: true,
                      [styles.html]: repo.language === 'HTML',
                      [styles.css]: repo.language === 'CSS',
                      [styles.js]: repo.language === 'JavaScript',
                      [styles.vue]: repo.language === 'Vue',
                      [styles.nth]: repo.language === 'nothing',
                    })}></span>
            <span className={styles.repo__info}>{repo.language}</span>
          </span>
          <div className={styles.repo__inner}>
            <span className={styles.star}></span>
            <span className={styles.repo__info}>
              {repo.stargazers_count}</span>
          </div>
          <div className={styles.repo__inner}>
            <span className={styles.fork}></span>
            <span className={styles.repo__info}>
              {repo.forks}</span>
            </div>
          <span className={styles.repo__info}> Last update: {new Date(repo.updated_at).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}</span>
          <span className={styles.repo__info}> {repo.description}</span>
          </div>
        </div>
        <a href={repo.html_url} className={styles.repo__link}>Подробнее</a>
      </div>
    );
  }
}

/*RepoItem.propTypes = {
  value: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onClickDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};*/

export default RepoItem;
