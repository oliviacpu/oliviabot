const getRandom = require('../logic/getRandom')

const spotifyUrls = [
  'https://open.spotify.com/album/338T7GIYUEuyeeHeZnSJta',
]

const albums = (bot, messageTypes) => {
  bot.hears(
    'album', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `i liked this ${getRandom(spotifyUrls)}`)
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: albums
}