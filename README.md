# Moody

## Starters

- [x] [react-redux-typescript-boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)
- [x] [web-api-auth-examples](https://github.com/spotify/web-api-auth-examples)

## Contains

- [x] [Express](https://github.com/expressjs/express) 4.16
- [x] [Typescript](https://github.com/microsoft/TypeScript) 3.2
- [x] [React](https://facebook.github.io/react/) 16.8
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.3
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Jest](https://github.com/facebook/jest) 24.9
- [x] [Enzyme](https://github.com/airbnb/enzyme) 3.10

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)

### Dev tools

- [x] [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
- [x] [Webpack Hot Middleware](https://github.com/webpack-contrib/webpack-hot-middleware)
- [x] [Nodemon](https://github.com/remy/nodemon)

## Installation

```
$ npm ci
```

## Running

```
$ npm start
```

## Test

```
$ npm test
```

## Build

```
$ npm run build
```

## Deploy (to the [GitHub Pages](https://pages.github.com/))

```
$ npm run deploy
```

## Format code (using [Prettier](https://github.com/prettier/prettier))

```
$ npm run prettier
```

# Spotify Accounts Authentication Examples

This project contains basic demos showing the different OAuth 2.0 flows for [authenticating against the Spotify Web API](https://developer.spotify.com/web-api/authorization-guide/).

These examples cover:

- Authorization Code flow
- Client Credentials flow
- Implicit Grant flow

### Installation

These examples run on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.

Once installed, clone the repository and install its dependencies running:

    $ npm install

#### Using your own credentials

You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. For the examples, we registered these Redirect URIs:

- http://localhost:8888 (needed for the implicit grant flow)
- http://localhost:8888/callback

Once you have created your app, replace the `client_id`, `redirect_uri` and `client_secret` in the examples with the ones you get from My Applications.

### Running the examples

In order to run the different examples, open the folder with the name of the flow you want to try out, and run its `app.js` file. For instance, to run the Authorization Code example do:

    $ cd authorization_code
    $ node app.js

Then, open `http://localhost:8888` in a browser.
