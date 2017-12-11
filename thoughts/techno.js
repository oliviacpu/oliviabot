const techno = (bot, messageTypes) => {
  bot.hears('i love techno', messageTypes, (bot, message) => {
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

    bot.reply(message, `what is techno`)
  })

  bot.hears('what is techno', messageTypes, (bot, message) => {
    try {
      bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'purple_heart',
      }, err => {
        if (err) throw err
      })
    } catch (err) {
      bot.botkit.log('Failed to add emoji reaction :(')
    }

    bot.reply(message, `i love techno`)
  })
}

// sorry

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention,ambient',
  addToBot: techno
}