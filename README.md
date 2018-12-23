# QHacks Dashboard

[![CircleCI
Status](https://circleci.com/gh/qhacks/qhacks-dashboard.svg?style=shield&circle-token=865c145070c9fe7a2d039310976c7a296f71920e)](https://circleci.com/gh/qhacks/qhacks-dashboard)
[![Coverage
Status](https://coveralls.io/repos/github/qhacks/qhacks-dashboard/badge.svg?branch=dev)](https://coveralls.io/github/qhacks/qhacks-dashboard?branch=dev)

This repository is a
[mono-repo](https://developer.atlassian.com/blog/2015/10/monorepos-in-git/)
containing the QHacks Dashboard. This dashboard is to serve as a hub for judges,
mentors, partners and hackers participating in [QHacks](https://qhacks.io/). The
dashboard implements a suite of features to make the process and experience of
attending a hackathon a richer and more pleasant one for all parties.

The back end application is built with [Node](https://nodejs.org/en/) using
[Express](https://expressjs.com/) and [Apollo Server](https://github.com/apollographql/apollo-server) to serve a GraphQL API, in conjunction with a RESTful API for authentication. For persistence we use
[PostgreSQL](https://www.postgresql.org/) and [Sequelize](https://github.com/sequelize/sequelize) as
our ORM to interact with the database. The front end is implemented using
[ReactJS](https://reactjs.org/), and
[Appollo Client](https://github.com/apollographql/apollo-client) for interacting with our GraphQL API and local state management, all of
which are bundled with [Webpack](https://webpack.github.io/). For more
information about the technical specifications please refer to the
[wiki](https://github.com/qhacks/qhacks-dashboard/wiki).

## Usage

Utilize the scripts below in the root of the project to get started:

**Setup the project and install dependencies:**

`npm run bootstrap`

> NOTE: This project uses [Lerna](https://github.com/lerna/lerna) as it is a
> mono-repo. This command installs all dependencies within individual projects
> and hoists the common package versions out to the `node_modules` directory in
> the root of the repo.

**Run the application in development mode:**

`npm run dev`

> NOTE: This builds the emails and starts the server in development mode.
> Additionally, this will start a webpack dev server to host a bundled version
> of our client. The webpack dev server will track your changes and continually
> generate bundles when changes occur.

**Build both the emails and the client:**

`npm run build`

**Build only the emails:**

`npm run build-emails`

**Build only the client:**

`npm run build-client`

**Start the server in production mode:**

`npm run start`

> NOTE: You need to run the build command before starting the server.

**Run the linter to check coding style:**

`npm run style`

**Run the formatter to fix code style issues:**

`npm run format`

**Run the test suite in all projects:**

`npm run test`

**Run the test suite and watch for changes in all projects:**

`npm run test-watch`

**Run the test suite with coverage data being sent to Coveralls:**

`npm run test-with-coverage`

> NOTE: You likely won't need to do this and it will fail because some
> environment variables are required.

When developing locally make sure to use the Lerna commands to run scripts
across projects and to add dependencies to individual or multiple projects.
Lerna has a concept called scopes, this allows you to scope commands to specific
projects. If the Lerna commands are not used it will likely cause dependency
issues and synchronization issues between projects. Find the list of Lerna
commands [here](https://github.com/lerna/lerna).

> See the [wiki](https://github.com/qhacks/qhacks-dashboard/wiki) for more
> information about environment setup.

## Contributing

A general guide to contribute in this repository is:

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request :rocket:

> See more information in our [contributing
> guide](https://github.com/qhacks/qhacks-dashboard/blob/dev/CONTRIBUTING.md).

## License

Copyright 2018 QHacks

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

> See the entire license in our [license
> file](https://github.com/qhacks/qhacks-dashboard/blob/dev/LICENSE).
