import {React, useState, useEffect, useCallback} from 'react';
import RepoItem from '../RepoItem/RepoItem';
import classnames from "classnames";
import styles from './About.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const About = () => {
  const url = 'https://api.github.com/users/KseniaVislova';
  const [repoList, setRepoList] = useState([]);
  const [arrRepo, setArrRepo] = useState([])
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setMessage] = useState('');
  const [infoUser, setInfoUser] = useState('');
  const [isPrev, setPrev] = useState(true);
  const [isNext, setNext] = useState(false);
  const [buttons, setButtons] = useState([1,2,3,4,5])

  const checkPage = useCallback((number) => {
    if (number <= pages && number > 0) return true;
  }, [pages])

  const getButtons = useCallback(() => {
    console.log(currentPage)
    console.log(pages)
    let array = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    let result = [];
    if (pages === 1) {
      setButtons([1])
    }
    if ((currentPage === 1 || currentPage === 2) && pages > 1) {
      setButtons([1,2])
    }
    if ((currentPage === 1 || currentPage === 2) && pages > 2) {
      setButtons([1,2,3])
    }
    if ((currentPage === 1 || currentPage === 2) && pages > 3) {
      setButtons([1,2,3,4])
    }
    if ((currentPage === 1 || currentPage === 2) && pages > 4) {
      setButtons([1,2,3,4,5])
    } else if ((currentPage === pages) && pages > 4) {
      console.log('last')
      setButtons([currentPage - 4, currentPage - 3, currentPage - 2, currentPage - 1, currentPage])
    } else if ((currentPage === pages - 1) && pages > 4) {
      console.log('pre-last')
      setButtons([currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1])
    } else {
      array.forEach(item => {
        if(checkPage(item)) result.push(item)
      })
      setButtons(result)
    }
    console.log(buttons)
  }, [pages, currentPage, checkPage])

  const checkDisabled = (page) => {
    setPrev(false);
    setNext(false);
    if(Number(page) === 1) setPrev(true);
    if(Number(page) === arrRepo.length) setNext(true);
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
    console.log(currentPage - 1)
    setCurrentPage(parseInt(currentPage - 1));
    setRepoList(arrRepo[parseInt(currentPage)]);
    checkDisabled(parseInt(currentPage - 1));
  }

  const goToStart = () => {
    setCurrentPage(1);
    setRepoList(arrRepo[0]);
    checkDisabled(1);
  }

  const goToEnd = () => {
    setCurrentPage(arrRepo.length);
    setRepoList(arrRepo[arrRepo.length - 1]);
    checkDisabled(arrRepo.length);
  }

  const getPages = (array, pages) => {
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
  }

  const fetchData = useCallback(async() => {
    try {
      let res = await (await fetch(url)).json();
      let repos = await (await fetch('https://api.github.com/users/KseniaVislova/repos')).json();
      setInfoUser(res);
      setLoading(false);
      setPages(Math.ceil(repos.length / 4));
      getPages(repos, Math.ceil(repos.length / 4));
      setCurrentPage(1);
    } catch(error) { 
      setLoading(false);
      setError(true);
      setMessage(error.message);
    } 
  }, [url]) 


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    getButtons()
  }, [getButtons])

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
                    <a href={infoUser === undefined ? '#' : infoUser.blog} className={styles.blog} target='_blank' rel="noreferrer">
                      Ссылка на мой сайт
                    </a>
                    <div className={styles.socials}>
                      <a href="https://twitter.com/lAmNotKsenia" className={styles.twitter} target="_blank" rel="noreferrer"><span></span></a>
                      <a href="mailto:kseniavislova@gmail.com" className={styles.gmail} target="_blank" rel="noreferrer"><span></span></a>
                      <a href="https://vk.com/kseeelis" className={styles.vk} target="_blank" rel="noreferrer"><span></span></a>
                      <a href="https://t.me/kvislova"  className={styles.telegram} target="_blank" rel="noreferrer"><span></span></a>
                    </div>
                    </div>
                  </div>
                </div>
                <div className={css(stylesAnimate.fadeInRight)}>
                 <h3 className={styles.title}>Мои работы:</h3>
                </div>
                <div className={css(stylesAnimate.slideInRight)}>
                  <ul className={styles.btn__list}>
                    <li><button className={styles.paginate_btn} onClick={goToStart}>start</button></li>
                    <li><button className={classnames([styles.paginate_btn], {[styles.noactive]: isPrev === true})} onClick={goPrev} disabled={isPrev}>	
                    &#5130;</button></li>
                    {repoList === undefined
                        ? 'неизвестно'
                        : buttons.map((item) => (
                            <li key={item}><button className={classnames([styles.paginate_btn], {[styles.paginate_active]: currentPage === Number(item)})} onClick={changePage}>{item}</button></li>
                          ))}
                    <li><button className={classnames([styles.paginate_btn], {[styles.noactive]: isNext === true})}onClick={goNext} disabled={isNext}>	
                    &#5125;</button></li>
                    <li><button className={styles.paginate_btn} onClick={goToEnd}>end</button></li>
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
