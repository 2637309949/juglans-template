## Usage
```javascript
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

### For Dev
```shell
$ npm install
$ npm run dev
```

### For ApiDoc
![Juglans flash](./assets/apidoc.png)

### For Prod
```shell
$ npm install
$ npm run build
```

### For Test
```shell
$ npm run test
```

##  Standard
### Http status and Http reponse
#### Reponse Success
```javascript
ctx.status = 200
ctx.body = {
    message: I18N.i18nLocale('ok')
}
```

#### Reponse Error
```javascript
logger.error(error.stack)
ctx.status = 500
ctx.body = {
    message: 'the request failed',
    stack: error.stack || error.message
}
```

### Global object
```javascript
// ./addition
repo.logger = logger.
    add(new winston.transports.File({
      filename: path.join(config.logger.path, 'error.log'),
      level: 'error',
      maxsize: config.logger.maxsize
    })).
    add(new winston.transports.File({
      filename: path.join(config.logger.path, 'combined.log'),
      maxsize: config.logger.maxsize
    }))
repo.request = fetch
```

### Logger
```javascript
module.exports = ({ router, events }) => {
  // routes: api/v1/mgo/user
  SeqExt.api.List(router, 'User')
    .Post(async function (ctx) {
      logger.info('User model post hook')
    })
    .Auth(ctx => true)
  // routes: api/v1/mgo/feature1/user
  SeqExt.api.Feature('feature1').List(router, 'User')
  // routes: api/v1/mgo/feature1/subFeature1/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').List(router, 'User')
  // routes: api/v1/mgo/custom/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'User')
  SeqExt.api.One(router, 'User')
  SeqExt.api.Delete(router, 'User')
  SeqExt.api.Update(router, 'User')
  SeqExt.api.Create(router, 'User')
}
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
