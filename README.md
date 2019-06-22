## Project structure

### Code structure

    juglans-template
    ├── assets
    │   └── public
    │       ├── apidoc
    │       └── upload
    ├── bin
    ├── logger
    ├── src
    │   ├── config
    │   ├── models
    │   ├── plugins
    │   ├── routes
    │   ├── services
    │   ├── tasks
    │   └── utils
    └── test
        └── routes

### Build structure

    build
    ├── assets
    │   ├── flash.jpeg
    │   └── public
    │       ├── apidoc
    │       └── upload
    ├── Dockerfile
    ├── logger
    │   ├── error.log
    │   └── http.log
    ├── src
    │   ├── config
    │   ├── models
    │   ├── plugins
    │   ├── routes
    │   ├── services
    │   ├── tasks
    │   └── utils
    └── test
        └── routes

## Usage

```javascript
/* eslint-disable indent */
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const app = require('./app')
const juglans = require('./juglans')
const logger = require('./addition').logger

app.Use(({ events }) => {
    events.on(juglans.events.SYS_JUGLANS_PLUGINS_RUNIMMEDIATELY_SUCCEED, function (message) {
        logger.info(message)
    })
})
app.RunImmediately()
```

### 1. For Dev
```shell
$ npm install
$ npm run dev
```
### 2. For Prod
```shell
$ npm install
$ npm run build
```

## MIT License

Copyright (c) 2018-2020 Double

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
