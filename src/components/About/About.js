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
  const url = 'https://api.github.com/users/KseniaVislova';
  const [info, setInfo] = useState([]);
  const [repoList, setRepoList] = useState([]);
  const [arrRepo, setArrRepo] = useState([])
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [pagination, setPagination] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setMessage] = useState('');
  const [infoUser, setInfoUser] = useState('');
  const [isPrev, setPrev] = useState(true);
  const [isNext, setNext] = useState(false);

  const checkDisabled = (page) => {
    console.log('checkDisabled start')
    console.log(page)
    console.log(arrRepo.length)
    setPrev(false);
    setNext(false);
    if(page == 1) setPrev(true);
    if(page == arrRepo.length) setNext(true);
  }

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.innerHTML));
    setRepoList(arrRepo[e.target.innerHTML - 1]);
    checkDisabled(e.target.innerHTML);
  }

  const goNext = () => {
    setCurrentPage(parseInt(currentPage + 1));
    setRepoList(arrRepo[parseInt(currentPage)]);
    checkDisabled(parseInt(currentPage + 1));
  }

  const goPrev = () => {
    setCurrentPage(parseInt(currentPage - 1));
    setRepoList(arrRepo[parseInt(currentPage)]);
    checkDisabled(parseInt(currentPage - 1));
  }

  const setPaginationBtn = (pages) => {
    let arr = [];
    if(pages < 10) {
      for (let i = 1; i <= pages; i++) {
        arr.push(i)
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        arr.push(i)
      }
    }
    setPagination(arr);
  }

  const setList = (array) => {
    console.log('start setList')
    console.log(array);
    setRepoList(arrRepo[0]);
    console.log('end setList')
  }

  const getPages = (array, pages) => {
    console.log('start getPages');
    const arrPages = [];
    let j = 0;
    for(let i = 0; i < pages; i += 1) {
      let arr = [];
      arr.push(array[j]);
      if(array[j + 1] !== undefined) arr.push(array[j + 1]);
      if(array[j + 2] !== undefined) arr.push(array[j + 2]);
      if(array[j + 3] !== undefined) arr.push(array[j + 3]);
      arrPages.push(arr);
      j += 4;
    }
    setArrRepo(arrPages);
    setRepoList(arrPages[0]);
    console.log(arrPages);
    console.log('end getPages');
  }

  const getInfo = async() => {
    console.log('start getInfo')
    try {
      let res = await (await fetch(url)).json();
      let repos = await (await fetch('https://api.github.com/users/KseniaVislova/repos')).json();
      setInfo(repos);
      setInfoUser(res);
      setLoading(false);
      setPages(Math.ceil(repos.length / 4));
      getPages(repos, Math.ceil(repos.length / 4));
      setPaginationBtn(Math.ceil(repos.length / 4));
      setCurrentPage(1);
    } catch(error) { 
      setLoading(false);
      setError(true);
      setMessage(error.message);
    } 
    console.log('end getInfo')
  }

  useEffect(async() => {
    await getInfo();
  }, []);

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
                  <ul className={styles.btn__list}>
                    <li><button onClick={goPrev} disabled={isPrev}>prev</button></li>
                    {repoList === undefined
                        ? 'неизвестно'
                        : pagination.map((item) => (
                            <li key={item}><button onClick={changePage}>{item}</button></li>
                          ))}
                    <li><button onClick={goNext} disabled={isNext}>next</button></li>
                  </ul>
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
