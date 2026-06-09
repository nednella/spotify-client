<div align='center'>
<h3><b>Spotify Web Player Clone</b></h3>
  <p>
    A custom Spotify client built with the Spotify Web API and Playback SDK
  </p>
  <p>
    <a href='https://www.youtube.com/watch?v=70G7YDejWG0'>Video Demo</a>
  </p>
</div>

<br>

![Project Showcase](https://github.com/nednella/spotify-client/blob/main/src/assets/readme/showcase.jpg)

<div align='center'>
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

</div>

## Installation

Before following the instructions, you should be aware that a **Spotify account** is required to complete the setup, and a **Premium subscription** is required for the application to run as intended.

1. Navigate to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new application
2. Insert `http://localhost:5173/callback` into the required Redirect URI box
3. Clone the repository

```sh
git clone git@github.com:nednella/spotify-server.git
```

4. Navigate to the cloned repository and install the dependencies

```sh
npm install
```

5. Obtain both the `Client ID` and `Client Sercret` from the app in your Spotify Developer Dashboard and add them to the .env file

```js
# Development ports
CLIENT_PORT = 5173
SERVER_PORT = 5000

# Spotify credentials
CLIENT_ID = [INSERT_CLIENT_ID_HERE]
CLIENT_SECRET = [INSERT_CLIENT_SECRET_HERE]
REDIRECT_URI = 'http://localhost:5173/callback'
```

6. Run the application locally

```sh
npm run dev
```

### Additional Requirements

-   Spotify Premium account
-   Follow the installation instructions for the client, [found here](https://github.com/nednella/spotify-client).

## Dependencies

-   [NodeJS](https://github.com/nodejs/node)
-   [ExpressJS](https://github.com/expressjs/express)
-   [Axios](https://github.com/axios/axios)

This repository also uses a refactored version of the popular [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node/) package. More information on this can be found in the README located in src > spotify-request-wrapper.
