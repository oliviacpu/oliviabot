const botkit = require('botkit')
const path = require('path')
const fs = require('fs')

const memory = path.resolve(process.cwd(), '.data', 'memory', 'slack')
const slackBot = botkit.slackbot({
  json_file_store: memory,
  debug: false,
})
slackBot.spawn({
  token: process.env.SLACK_API_TOKEN
}).startRTM()

const thoughts = path.resolve(process.cwd(), 'thoughts')
fs.readdirSync(thoughts).forEach((file) => {
  const thought = require('../thoughts/' + file)
  thought.addToBot(slackBot, thought.slackMessageTypes)
})