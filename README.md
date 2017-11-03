# QHacks Hacker Dashboard

This repository encapsulates a monolithic implementation of the QHacks Hacker Dashboard. This dashboard is to serve as a hub for judges, mentors, partners and hackers participating in [QHacks](http://qhacks.io/). The dashboard implements a suite of features to make the process and experience of attending a hackathon a richer and more pleasant one.

The back end application is built using a Node server using Express to serve a RESTful API. The front end is implemented using [ReactJS](https://reactjs.org/), and [Redux](http://redux.js.org/docs/introduction/) for state management, all of which are bundled with [Webpack](https://webpack.github.io/). For more information about the technical specifications please refer to the [wiki](https://github.com/qhacks/hacker-dashboard/wiki).

## Configuration

For development this project uses `dotenv` to allow you tp specify environment variables in a static file.

> NOTE: You will need to create a .env file at the root your project with the desired environment variables that are outlined below.

### Back End

See the environment variables below for the back end to operate:

Name | Description | Required | Default
--- | --- | --- | ---
`AUTH_SECRET` | The secret used to encrypt auth tokens | Yes | None
`MONGO_DBNAME` | The database name to use inside the instance of MongoDB. | Yes | None
`MONGO_HOST` | The hostname to use to access the MongoDB instance. | Yes | None
`MONGO_PASS` | The password to access the MongoDB instance. | No | None
`MONGO_PORT` | The port to use to access the MongoDB instance. | No | 27017
`MONGO_USER` | The username to access the MongoDB instance. | No | None
`PORT` | Port to run the Express sever on. | No | 3000

### Front End

There are currently no environment variables needed for the front end, update this as necessary.

However, there within the `client/assets` directory there is `main.scss` file that has variables that describe the colours used across the UIs. Feel free to modify those to alter the styling of the application, the [SASS](http://sass-lang.com/) is compiled using Webpack. Please note that we will use the [SCSS](http://sass-lang.com/guide) syntax over the SASS syntax when working with styling.

## Usage

Utilize the scripts below to use the application:

```
# install dependancies
npm install

# run the server in development mode with nodemon
npm run dev

# run the server in production mode
npm run start

# build the front end
npm run build

# runs webpack-dev-server for ui development
npm run ui

# test the server code (lints code)
npm run test
```

## Deploying

The application is deployed using the Google Cloud Platform, in order to deploy the application you can run the command:

```npm run deploy```

> NOTE: This assumes you have already installed the GCP SDK onto your machine and configured it to be associated with the account that we deploy the hacker dashboard from, refer the resources [here](https://cloud.google.com/sdk/docs/) to do that. You will need to contact one of the team members to get this level of access.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

Copyright 2017 QHacks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
