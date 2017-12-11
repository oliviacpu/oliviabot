const is = require('valido')
const Promise = require('bluebird')

const soundcloud = require('./providers/soundcloud')
const spotify = require('./providers/spotify')
const vimeo = require('./providers/vimeo')
const youtube = require('./providers/youtube')
const providers = [soundcloud, spotify, vimeo, youtube]

/**
 * Factory that return Embedify instance
 *
 * @param {Object} [options]
 * @returns {Embedify}
 */
function create(options) {
  return new Embedify(options);
}

/**
 * Constructor
 *
 * @param {Object} [options]
 */
function Embedify(options) {
  this.providers = providers
  this.parse = !(options && options.parse === false)
  this.failSoft = options && options.failSoft === true
  this.concurrency = options && is.natural(options.concurrency) ? options.concurrency : 10
}

/**
 * Gets the oEmbed information for a URL
 * or list of URLs
 *
 * @param {String|Array} urls
 * @returns {Promise}
 */
Embedify.prototype.get = function get(urls) {
  const concurrency = this.concurrency;

  return Promise.map(this.ensureUrls(urls), url => this.tryResolve(url), { concurrency })
    .then(results => results.filter(r => is.existy(r)))
};

/**
 * Tries to resolve oEmbed information for a URL
 *
 * @param {String} url
 * @returns {Promise<Object>}
 */
Embedify.prototype.tryResolve = function tryResolve(url) {
  return Promise.resolve()
    .then(() => {
      let match = null

      providers.some(provider => {
        provider.regExp.some(re => {
          const reMatch = url.match(re)

          if (is.array(reMatch) && reMatch.length) {
            match = {
              url: provider.transform(reMatch),
              apiUrl: provider.apiUrl,
            }
          }
          return is.existy(match)
        })
        return is.existy(match)
      })

      return match ? this.getEmbed(match.apiUrl, match.url) : null
    })
}

/**
 * Ensures that URLs are valid
 *
 * @param {String|Array} urls
 * @returns {Promise<Array>}
 */
Embedify.prototype.ensureUrls = function ensureUrls(urls) {
  return Promise.resolve()
    .then(() => {
      if (is.all.string(urls)) {
        return urls
      } else if (is.string(urls)) {
        return [urls]
      }

      throw new TypeError('Invalid URL or list of URLs')
    })
}

/**
 * Performs HTTP request
 *
 * @param {String} apiUrl
 * @param {String} matchUrl
 * @returns {Promise}
 */
Embedify.prototype.getEmbed = function getEmbed(apiUrl, matchUrl) {
  return Promise.resolve()
    .then(() => {
      return fetch(
        `https://cors-anywhere.herokuapp.com/${apiUrl}?url=${matchUrl}&format=json`
      ).then(
        response => response.json()
      ).then(
        json => this.parseResponse(json)
      )
    })
}

/**
 * Parses the oEmbed response
 *
 * @param {Object} response
 * @returns {Object}
 */
Embedify.prototype.parseResponse = function parseResponse(response) {
  const oEmbed = response

  if (!this.parse) {
    return oEmbed
  }
  
  const result = {
    type: oEmbed.type,
    version: oEmbed.version ? oEmbed.version.toString() : null,
    title: oEmbed.title,
    html: oEmbed.html,
    author: {
      name: oEmbed.author_name,
      url: oEmbed.author_url,
    },
    provider: {
      name: oEmbed.provider_name,
      url: oEmbed.provider_url,
    },
    image: {
      url: oEmbed.thumbnail_url,
      width: parseInt(oEmbed.thumbnail_width, 10) || null,
      height: parseInt(oEmbed.thumbnail_height, 10) || null,
    },
    width: parseInt(oEmbed.width, 10) || null,
    height: parseInt(oEmbed.height, 10) || null,
  }
  deepCleanNull(result)
  return result
};

function deepCleanNull(obj) {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    if (obj[name] === null || obj[name] === undefined) {
        delete obj[name]
    } else if (typeof obj[name] === 'object') {
        deepCleanNull(obj[name])
    }
  });
}

// Public
module.exports.create = create
