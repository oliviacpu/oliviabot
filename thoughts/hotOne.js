const getWeather = require('yahoo-weather')
const { isHotOne, inchesFromMiddaySun } = require('hot-one')

const hotOne = (bot, messageTypes) => {
  bot.hears('weather', messageTypes, (bot, message) => {
    bot.startConversation(message, (err, convo)  =>{
      convo.ask('Where are you?', (response, convo)  =>{
        getWeather(response.text, 'f').then(({ item }) => {
          const temp = item.condition.temp
          
          if (isHotOne(temp)) {
            convo.say('Man, it\'s a hot one')
            
            if (Math.round(inchesFromMiddaySun(temp)) === 7) {
              convo.say('Like seven inches from the midday sun')
              convo.say("https://www.youtube.com/watch?v=6Whgn_iE5uc")
            }
            convo.next()
          } else {
            convo.say(`It is ${temp} degrees.`)
            convo.next()
          }
        }).catch(err => {
          convo.say('I didn\'t understand that')
          convo.next()
          
          bot.botkit.log('Failed to get weather :(', err)
        })
      })
    })
  })
}

// <3 max

module.exports = {
  webMessageTypes: 'message_received',
  slackMessageTypes: 'direct_message,direct_mention,mention',
  addToBot: hotOne
}