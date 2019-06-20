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
