const getRandom = require('../logic/getRandom')

const stVincentGifs = [
  'https://cdn.glitch.com/a47f3634-a3f2-4829-9980-1d32696a692d%2Fannie_laugh.gif?1512690102350',
  'https://cdn.glitch.com/a47f3634-a3f2-4829-9980-1d32696a692d%2Fannie_light.gif?1512690102666',
  'https://cdn.glitch.com/a47f3634-a3f2-4829-9980-1d32696a692d%2Fannie_idk.gif?1512690102802',
  'https://cdn.glitch.com/a47f3634-a3f2-4829-9980-1d32696a692d%2Fannie_ok.gif?1512690102904',
]

const stVincent = (bot, messageTypes) => {
  bot.hears(
    ['st vincent', 'st. vincent'], 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `i love st. vincent ${getRandom(stVincentGifs)}`)
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention,ambient',
  addToBot: stVincent
}