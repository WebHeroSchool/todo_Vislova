import React from 'react';
import styles from './About.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';
import classNames from "classnames";
import { fadeInRight, slideInRight } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const stylesAnimate = StyleSheet.create({
  fadeInRight: {
    animationName: fadeInRight,
    animationDuration: '1s'
  },
  slideInRight: {
    animationName: slideInRight,
    animationDuration: '1s'
  },
})

const octokit = new Octokit();

class About extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    octokit.repos
      .listForUser({
        username: 'KseniaVislova',
      })
      .then(({ data }) => {
        this.setState({
          repoList: data.filter((repo) => repo.visibility === 'public'),
          isLoading: false,
        });
      })

      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: err,
        });
      });
    octokit.users
      .getByUsername({
        username: 'KseniaVislova',
      })
      .then(({ data }) => {
        this.setState({
          infoUser: data,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: err,
        });
      });
  }

  render() {
    const { isLoading, repoList, infoUser, errorMessage, isError } = this.state;
    {
      console.log(repoList);
    }
    {
      console.log(infoUser);
    }
    return (
      <div className={styles.wrap}>
        {isLoading ? (
          <div className={styles.loader}>
            <CircularProgress color="inherit"/>
          </div>
        ) : (
          <div>
            <div className={css(stylesAnimate.fadeInRight)}><h2 className={styles.title}> Обо мне</h2></div>
            {isError ? (
              'Ошибка:' + errorMessage
            ) : (
              <div>
                <div className={css(stylesAnimate.slideInRight)}>
                  <div className={styles.inner}>
                    {infoUser === undefined ? (
                      'неизвестно'
                    ) : (
                        <img
                        src={infoUser.avatar_url}
                        alt="Avatar"
                        className={styles.avatar}

                      />
                    )}
                    <div className={styles.user}>
                    <p className={styles.name}>
                      {infoUser === undefined ? ' неизвестно' : infoUser.name}
                    </p>
                    <p className={styles.bio}>
                      {infoUser === undefined ? ' неизвестно' : infoUser.bio}
                    </p>
                    <a href={infoUser === undefined ? '#' : infoUser.blog} className={styles.blog} target='_blank'>
                      Ссылка на мой сайт
                    </a>
                    <div className={styles.socials}>
                      <a href="https://twitter.com/lAmNotKsenia" className={styles.twitter} target="_blank"></a>
                      <a href="mailto:kseniavislova@gmail.com" className={styles.gmail} target="_blank"></a>
                      <a href="https://vk.com/kseeelis" className={styles.vk} target="_blank"></a>
                      <a href="https://t.me/kvislova"  className={styles.telegram} target="_blank"></a>
                    </div>
                    </div>
                  </div>
                </div>
                <div className={css(stylesAnimate.fadeInRight)}>
                 <h3 className={styles.title}>Мои работы:</h3>
                </div>
                <div className={css(stylesAnimate.slideInRight)}>
                  <ul className={styles.repo__list}>
                    {repoList === undefined
                      ? 'неизвестно'
                      : repoList.map((repo) => (
                          <li key={repo.id} className={styles.repo__item}>
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
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default About;
