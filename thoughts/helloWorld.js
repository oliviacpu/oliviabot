const helloWorld = (bot, messageTypes) => {
  bot.hears(
    ['hello', 'hi'], 
    messageTypes, 
    (bot, message) => {
      try {
        bot.api.reactions.add({
          timestamp: message.ts,
          channel: message.channel,
          name: 'robot_face',
        }, err => {
          if (err) throw err
        })
      } catch (err) {
        bot.botkit.log('Failed to add emoji reaction :(')
      }

      bot.reply(message, 'Hello.')
    }
  )

  bot.hears(
    ['identify yourself', 'who are you', 'what is your name'],
    messageTypes, 
    (bot, message) => {
      bot.reply(message,"I\'m Olivia's bot!")
    }
  )
}

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: helloWorld
}