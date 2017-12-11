const creep = 'https://www.youtube.com/watch?v=XFkzRNyygfk'
const wonderwall = 'https://www.youtube.com/watch?v=bx1Bh8ZvH84'

const radioasis = (bot, messageTypes) => {
  bot.hears(
    'favorite radiohead song', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `this is my favorite radiohead song ${wonderwall}`) 
    }
  )

  bot.hears(
    'favorite oasis song', 
    messageTypes, 
    (bot, message) => {
      bot.reply(message, `this is my favorite oasis song ${creep}`) 
    }
  )
}

// i know

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: radioasis
}