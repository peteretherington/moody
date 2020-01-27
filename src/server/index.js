/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const path = require('path'); // utility for file and directory paths
const express = require('express'); // web server framework
const request = require('request'); // library
const cors = require('cors'); // cross-origin resource sharing
const querystring = require('querystring'); // assign values to parameters in the URL
const cookieParser = require('cookie-parser'); // parse and populate cookies

require('dotenv').config(); // configure environment variables
const { NODE_ENV, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, PORT } = process.env;

const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = REDIRECT_URI;

const stateKey = 'spotify_auth_state';
const outPath = path.join(__dirname, '../../build');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

app
  .use(express.static(outPath))
  .use(cors())
  .use(cookieParser());

if (NODE_ENV === 'development') {
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware'); // Connect FE with Express
  const hotMiddleware = require('webpack-hot-middleware');
  const devConfig = require('../../webpack.config.dev');
  const compiler = webpack(devConfig);

  app
    .use(devMiddleware(compiler, { publicPath: devConfig.output.publicPath }))
    .use(hotMiddleware(compiler));
}

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
    })}`,
  );
});

app.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const { code = null, state = null } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      `/#${querystring.stringify({
        error: 'state_mismatch',
      })}`,
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: 'Basic ' + new Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, (error, { statusCode }, body) => {
      if (!error && statusCode === 200) {
        const { access_token, refresh_token } = body;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(
          `/#${querystring.stringify({
            error: 'invalid_token',
          })}`,
        );
      }
    });
  }
});

app.get('/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + new Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, { statusCode }, body) => {
    if (!error && statusCode === 200) {
      const { access_token } = body;
      res.send({ access_token });
    }
  });
});

app.listen(PORT, () => {
  const greenFont = '\x1b[32m%s\x1b[0m';
  console.log(greenFont, `\nhttp://localhost:${PORT}\n`);
});
