const autoLink = require('auto-link')
const getUrls = require('get-urls')
const embedify = require('../embedify')

const options = { parse: true }
const oEmbed = embedify.create(options)

const messages = document.getElementById('messages')
const messageEntryInput = document.getElementById('message-entry--input')

const createElement = (type, className) => {
  const element = document.createElement(type)
  element.className = className
  return element
}

const postMessage = (text) => {
  renderUserMessage(text)
  
  const headers = new Headers()
  headers.append('Accept', 'application/json') // This one is enough for GET requests
  headers.append('Content-Type', 'application/json') // This one sends body  
  
  const body = {
    type: 'message',
    channel: 'webhook',
    user: 'fake',
    text
  }

  fetch(
    `${window.document.location}botkit/receive`, 
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }
  ).then(
    response => response.text()
  ).then(
    text => JSON.parse(text)
  ).then(renderBotMessage)
}

const renderBotMessage = ({text}) => {
  const message = createElement('div', 'message message__bot')
  const messageContainer = createElement('div', 'message--container message--container__bot')
  const botMessage = createElement('div', 'message--body bot')
  botMessage.innerHTML = autoLink.link(text)
  messageContainer.appendChild(botMessage)
  
  const urls = Array.from(getUrls(text))
  if (urls.length > 0) {
    oEmbed.get(urls).then(embeds => {
      console.log('embeds', embeds)
      const embed = createElement('div', 'message--embed bot')
      embed.innerHTML = embeds[0].html
      messageContainer.appendChild(embed)
    })
  }
  
  message.appendChild(messageContainer)
  appendMessage(message)
}

const renderUserMessage = (text) => {
  const message = createElement('div', 'message message__user')
  const messageContainer = createElement('div', 'message--container message--container__user')
  const userMessage = createElement('div', 'message--body user')
  userMessage.innerHTML = text
  messageContainer.appendChild(userMessage)
  
  message.appendChild(messageContainer)
  appendMessage(message)
}

const appendMessage = (message) => messages.insertBefore(message, messages.children[0])

const submitMessage = (event) => {
  event.preventDefault()
  if (messageEntryInput.value !== '') {
    postMessage(messageEntryInput.value)
    messageEntryInput.value = ''
  }
}

module.exports = {
  submitMessage,
}