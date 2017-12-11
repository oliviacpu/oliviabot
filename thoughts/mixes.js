const getRandom = require('../logic/getRandom')

const mixUrls = [
  'https://soundcloud.com/discwoman/discwoman-33-x-dj-voices',
  'https://soundcloud.com/rinsefm/hodge141117',
  'https://soundcloud.com/rinsefm/smartbartakeoversold251117?in=rinsefm/sets/smartbar-takeover',
  'https://soundcloud.com/rroxymore/freerotation-live-recording-dj-set',
  'https://soundcloud.com/fbi-warning/dead-by-3',
  'https://soundcloud.com/in-real-life-music/irl-guest-mix-027-internet-daughter-official-rrr-mix',
]

const mixes = (bot, messageTypes) => {
  bot.hears(
    'mix', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `i liked this ${getRandom(mixUrls)}`)
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: mixes
}