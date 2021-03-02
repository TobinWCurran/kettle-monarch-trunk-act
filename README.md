# API for a turn-based line game client
This application is not built or intended for use in a production environment.

## Dependencies
### Machine Dependencies
You will need to have the following intalled on your machine.
- [Node](https://nodejs.org/en/) >= v13\
Node Version Manager ([NVM](https://github.com/nvm-sh/nvm)) is a good solution for managing Node versions.
- [NPM](https://www.npmjs.com/)\
Unknown minimum version compaitibility, but this project was built with v7.5.6.
### Application Dependencies
Application dependencies will be installed with NPM
- [express](https://expressjs.com/)\
Web Server and router
- [body-parser](https://www.npmjs.com/package/body-parser)\
Parses incoming request bodies in a middleware.
- [cors](https://www.npmjs.com/package/cors)\
Enables and set Cross-Origin Resource Sharing (CORS) options.
- [immutable](https://immutable-js.github.io/immutable-js/)\
Provides persistent immutable data structures.
- [line-intersect](https://www.npmjs.com/package/line-intersect)\
Determines line segment colinearity and intersections.
### Development Dependencies
- [eslint](https://eslint.org/)\
Keeps the code reasonably clean.
- [nodemon]()\
Automatically restarts the node application when file changes are detected.

## Running the API application
1. Clone the repository: `git clone git@github.com:TobinWCurran/kettle-monarch-trunk-act.git`
2. Enter the directory: `cd kettle-monarch-trunk-act`
3. Install the Node dependencies: `npm install`
4. Start the development server: `npm run dev`
