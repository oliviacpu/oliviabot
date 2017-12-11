const getRandom = require('../logic/getRandom')

const myVideoUrls = [
  'https://vimeo.com/241448544',
  'https://vimeo.com/235476645',
  'https://vimeo.com/235476470',
  'https://vimeo.com/239766733',
]

const myVideos = (bot, messageTypes) => {
  bot.hears(
    'your videos', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `i made this ${getRandom(myVideoUrls)}`)
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: myVideos
}