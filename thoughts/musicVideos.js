const getRandom = require('../logic/getRandom')

const musicVideoUrls = [
  'https://www.youtube.com/watch?v=SFQxkupJE5A',
  'https://www.youtube.com/watch?v=xoxCItHxLiM',
  'https://www.youtube.com/watch?v=xlcywgEMuGI',
  'https://www.youtube.com/watch?v=eu0KsZ_MVBc',
  'https://www.youtube.com/watch?v=K44j-sb1SRY',
  'https://www.youtube.com/watch?v=Y1PVmANeyAg',
  'https://www.youtube.com/watch?v=lHRAPIwsS5I',
]

const musicVideos = (bot, messageTypes) => {
  bot.hears(
    'music video', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `i liked this ${getRandom(musicVideoUrls)}`)
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: musicVideos
}