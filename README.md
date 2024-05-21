## AI Logo Creator

Minimal service to demostrate how to generate a logo using AI.

### 1. Check requirements before starting

- **node**: "=20.x"
- **npm**: ">=10.x"

### 2. Installation

Clone the project in your local machine and run the install scripts.
You will see some warnings in the `front` project because `react-scripts` uses some old libs. That's fine for now.

```
$ git clone git@github.com:hacknaked/logo-creator.git
$ cd logo-creator
$ npm install
```

### 3. Configure the server

From the project root, go to the `server` folder:

```
$ cd server
```

Create a new file `.env` with the config parameters. You will need a [Stability API key](https://platform.stability.ai/) and a [Bunny Access Key ](https://bunny.net/).

```
# /server/.env

STABILITY_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUNNY_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx-xxxx-xxxx
DATABASE_URL=file:./dev.sqlite
```

Then, run the `build` script for setting up the server:

1. create a local SQLite DB,
1. run the DB migrations,
1. generate all missing types before building,
1. and compile the Typescript sources.

```
$ npm run build
```

Finally, execute:

```
$ npm start
```

and you will start a local GraphQL server on http://localhost:4000. Now, you are ready to send some queries and mutations using this server.

### 4. Start the frontend

Open a new terminal. From the project root, go to the folder `front` and run the `start` script:

```
$ cd front
$ npm start
```

Finally, go to http://localhost:3000/ to see frontend running in a local environment.
