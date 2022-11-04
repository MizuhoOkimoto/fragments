# fragments

Cloud Computing for Programmers (CCP555) - Fall 2022

This is a back-end microservice using JavaScript.

## Setup outline

### npm Setup

- `$ npm init -y` (the -y flag answers 'yes' to all questions)
- `$ npm install` - Generates a `package-lock.json` file.

### Prettier Setup

- `$ npm install --save-dev --save-exact prettier`
- Create a `.prettierrc` file
- Create a `.prettierignore` file

### ESLint Setup

- `$ npm install --save-dev eslint` - Generates `.eslintrc.js` file
- `$ npx eslint --init`
- Add script `"lint": "eslint --config .eslintrc.js src/**"` under package.json file

### Structured Logging and Pino Setup

- Create a `src/` folder(`$ mkdir src`) under the root directory to contain all of the source code
- `$ npm install --save pino pino-pretty pino-http`
- Create and configure a Pino Logger instance in `src/logger.js` that you can use throughout the code to log various types of information

### Express App Setup

- `$ npm install --save express cors helmet compression`
- Create a `src/app.js` file to define the Express app.
- The file will

      a) create an app instance
      b) attach various middleware for all routes
      c) define our HTTP route(s)
      d) add middleware for dealing with 404s
      e) add error-handling middleware

### Express Server Setup

- `$npm install --save stoppable` - Install the stoppable package to allow our server to exit gracefully (i.e., wait until current connections are finished before shutting down)
- Create a `src/server.js` file to start our server
- `$ npm run lint` - make sure there are no errors that need to be fixed
- `$ node src/server.js` - Test that the server can be started manually and check http://localhost:8080

> Note: CURL output - [Curl](https://curl.se) is a command-line tool for transferring data specified with URL syntax.

```sh
curl localhost:8080
{"status":"ok","author":"author_name","githubUrl":"github_url","version":"x.x.x"}
```

Install [jq](https://stedolan.github.io/jq/) and pipe the CURL output to it, which will pretty-print the JSON

```sh
curl -s localhost:8080 | jq
{
  "status": "ok",
  "author": "author_name",
  "githubUrl": "github_url",
  "version": "x.x.x"
}
```

Confirm that your server is sending the right HTTP headers

```sh
$ curl -i localhost:8080
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';block-all-mixed-content;
...
Connection: keep-alive
Keep-Alive: timeout=5
{"status":"ok","author":"author_name","githubUrl":"github_url","version":"x.x.x"}
```

### Server Startup Scripts

- `$npm install --save-dev nodemon` - Install the nodemon package, it automatically reloads the server whenever the code changes
- Add some npm scripts to package.json in order to automatically start our server

  > Note:

  `start` script runs our server normally

  `dev` runs it via nodemon, which watches the `src/**` folder for any changes, restarting the server whenever something is updated

  `debug` is the same as dev but also starts the node inspector on port 9229, so that you can attach a debugger (e.g., VSCode)

```sh
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "lint": "eslint --config .eslintrc.js src/**",
  "start": "node src/server.js",
  "dev": "cross-env LOG_LEVEL=debug nodemon ./src/server.js --watch src",
  "debug": "cross-env LOG_LEVEL=debug nodemon --inspect=0.0.0.0:9229 ./src/server.js --watch src"
},
```

> Node: for Windows, it needs to install [cross-env](https://www.npmjs.com/package/cross-env) package, and implement before the `LOG_LEVEL`.

### Debug

The `debug` script allows you to connect a debugger (e.g., VSCode) to your running process. In order to set this up, add a new file to your `.vscode/` folder named `launch.json`, with the following contents:

```sh
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    // Start the app and attach the debugger
    {
      "name": "Debug via npm run debug",
      "request": "launch",
      "runtimeArgs": ["run-script", "debug"],
      "runtimeExecutable": "npm",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    }
  ]
}
```

> Node: more detailed instructions

- <https://code.visualstudio.com/docs/editor/debugging>
- <https://code.visualstudio.com/docs/nodejs/nodejs-debugging>
