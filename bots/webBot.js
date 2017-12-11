const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const botkit = require('botkit')
const path = require('path')
const fs = require('fs')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(express.static('public'))

server.set("view engine", "pug")
server.get('/', (req, res) => {
  res.render('index')
})
server.post('/botkit/receive', (req, res) => {
  webBot.handleWebhookPayload(req, res)
})

const httpServer = http.createServer(server)
httpServer.listen(process.env.PORT || 3000)

const memory = path.resolve(process.cwd(), '.data', 'memory', 'web')
const webBot = botkit.socketbot({
  json_file_store: memory,
  debug: false,
})
webBot.openSocketServer(httpServer)
webBot.startTicking()

const thoughts = path.resolve(process.cwd(), 'thoughts')
fs.readdirSync(thoughts).forEach((file) => {
  const thought = require('../thoughts/' + file)
  thought.addToBot(webBot, thought.webMessageTypes)
})