import React from 'react';
import styles from './About.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';

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
          repoList: data,
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
          <CircularProgress color="secondary" />
        ) : (
          <div>
            <h1 className={styles.title}> Обо мне</h1>
            {isError ? (
              'Ошибка:' + errorMessage
            ) : (
              <div>
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
                  <p className={styles.user}>
                    Имя пользователя -{' '}
                    {infoUser === undefined ? ' неизвестно' : infoUser.login}
                  </p>
                </div>

                <h3 className={styles.title}>Мои репозитории:</h3>
                <ol>
                  {repoList === undefined
                    ? 'неизвестно'
                    : repoList.map((repo) => (
                        <li key={repo.id}>
                          <a href={repo.html_url}>{repo.name}</a>
                        </li>
                      ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default About;
