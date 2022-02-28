import {React, useState, useEffect} from 'react';
import RepoItem from '../RepoItem/RepoItem';
import styles from './About.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';
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

const About = () => {
  const url = 'https://api.github.com/users/KseniaVislova'
  const [repoList, setRepoList] = useState([0,0]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setMessage] = useState('');
  const [infoUser, setInfoUser] = useState('');

  const getinfo = async() => {
   octokit.repos
      .listForUser({
        username: 'KseniaVislova',
      })
      .then(({ data }) => {
        console.log(data);
        const arr = data.filter((repo) => repo.visibility === 'public');
        setRepoList(arr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage(err);
      });
    octokit.users
      .getByUsername({
        username: 'KseniaVislova',
      })
      .then(({ data }) => {
        setInfoUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage(err);
      });
  }

  useEffect(() => {
    getinfo();
  }, []);

  console.log(repoList)

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
                          <li key={repo.id}>
                            <RepoItem repo={repo}/>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
  )
}

export default About;
