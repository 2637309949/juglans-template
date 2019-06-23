// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

require('./addition')

const cfg = require('./config')
const Juglans = require('./juglans')
const injects = require('./injects')

const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(cfg, { name: 'juglans test v1.1' })
app.Inject(injects, { test: 'xx' })

require('./plugins')(app)

module.exports = app
