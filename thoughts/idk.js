const eliza = require('eliza')
const olivia = new eliza()

const idk = (bot, messageTypes) => {
  bot.on(messageTypes, (bot, message) => {
    bot.reply(message, olivia.transform(message.text))
  })
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: idk
}