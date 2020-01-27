import * as React from 'react';
// import * as style from './style.css';

export namespace Login {
  export interface Props {}
}

interface Unknown {
  [key: string]: string
}

export const Login = () => {
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    const getHashParams = ()  => {
      let hashParams: Unknown = {};
      let e: RegExpExecArray | null, 
          r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while (e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    const callAPI = (): object | void => {
      const { access_token, error } = getHashParams();

      if (error) {
        alert('There was an error during the authentication');
      } else {
        if (access_token) {
          return fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
          });
        }
      }
    }

  return (<section>
    <a href="/login" onClick={callAPI}>Log in with Spotify</a>
  </section>);
};

