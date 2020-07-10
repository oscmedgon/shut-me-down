#!/usr/bin/env node

const os = require('os')
const express = require('express')
const powerOff = require('power-off')
console.log(process.argv[0])
const myArgs = process.argv.slice(2);

const app = express()

app.delete('/', function (req, res) {
    res.end()
    console.log('exit')
    process.exit()
})

app.post('/halt', function (req, res) {
    powerOff(function (err, stderr, stdout) {
        if (err) {
            console.error(err)
            res.status(500).json({ error: `Can't run power-off` })
        } else {
            res.end()
        }
    })
})

const port = 5709

const HOST = myArgs[0] || '0.0.0.0'

app.listen(port, HOST, function () {
    console.log(`stop-server listening on http://${HOST}:${port}`)
})
