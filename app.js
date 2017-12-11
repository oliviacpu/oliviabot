require('./bots/webBot')

if (!process.env.SLACK_API_TOKEN) {
  console.log('Add SLACK_API_TOKEN to .env')
} else {
  require('./bots/slackBot')
}
