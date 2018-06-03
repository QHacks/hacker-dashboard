# QHacks Hacker Dashboard

[![CircleCI](https://circleci.com/gh/qhacks/hacker-dashboard.svg?style=svg)](https://circleci.com/gh/qhacks/hacker-dashboard)

This repository is a mono-repo containing the QHacks Hacker Dashboard. This dashboard is to serve as a hub for judges, mentors, partners and hackers participating in [QHacks](https://qhacks.io/). The dashboard implements a suite of features to make the process and experience of attending a hackathon a richer and more pleasant one for all parties.

The server-side application is built using a Node server using Express to serve a RESTful API. The client-side is implemented using [ReactJS](https://reactjs.org/), and [Redux](http://redux.js.org/docs/introduction/) for state management, all of which are bundled with [Webpack](https://webpack.github.io/). For more information about the technical specifications please refer to the [wiki](https://github.com/qhacks/hacker-dashboard/wiki).

## Usage

Utilize the scripts below to use the application:

```
# setup project and install dependencies
npm run bootstrap

# run the application in development mode
npm run dev

# build the client and emails
npm run build

# run the application in production mode
npm run start

# check code style using linter
npm run style
```

## Contributing

A general guide to contributing in this repository is:

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request :D

> See more information in our [contributing guide](https://github.com/qhacks/hacker-dashboard/blob/dev/CONTRIBUTING.md).

## License

Copyright 2018 QHacks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
