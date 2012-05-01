var http = require('http')
  , querystring = require('querystring')
  , url = require('url')

//  Ebay Service Endpoints
var SERVICE_URLS = {
  finding: 'http://svcs.ebay.com/services/search/FindingService/v1'
}

var SERVICES = {}
//  parse Service Endpoints
Object.keys(SERVICE_URLS).forEach(function (key) {
  SERVICES[key] = url.parse(SERVICE_URLS[key])
})

//  Allowed http verbs
var VERBS = ['get', 'post']

module.exports = Ebay

function Ebay (opts) {
  if(!opts || !opts.app_id) {
    throw new Error('options object must specify `app_id`')
  }
  this.opts = opts
}

Ebay.prototype.makeRequest = function (verb, service, params, cb) {
  if(!cb || typeof cb !== 'function')       throw new Error('must provide callback')
  if(!params || typeof params !== 'object') {
    var err = new Error('must specify params object')
    return cb(err, null)
  }
  if(VERBS.indexOf(verb) === -1) {
    var err = new Error('http verb `' + verb + '` not allowed')
    return cb(err, null)
  }
  var svc = SERVICES[service]
  if(!svc) {
    var err = new Error('Ebay service `' + service + '` not supported')
    return cb(err, null)
  }

  params['SECURITY-APPNAME'] = this.opts.app_id
  params['SERVICE-VERSION'] = '1.0.0'
  params['RESPONSE-DATA-FORMAT'] = 'JSON'
  params['REST-PAYLOAD'] = true

  var qs = querystring.stringify(params)

  var opts = {
    host: svc.host
  , path: svc.path + '?' + qs
  , method: verb.toUpperCase()
  }

  var req = http.request(opts, function (res) {
    var data = ''
    res.on('data', function (chunk) { data += chunk })
    res.on('end', function () {
      var error = null
        , parsed = null

      try {
        parsed = JSON.parse(data)
      } catch (err) {
        error = new Error('Ebay reply is not valid JSON')
        error.msg = err
      } finally {
        return cb(error, parsed)
      }
    })
  })
  req.on('error', function (err) {
    var error = new Error('http client error')
    error.msg = err
    return cb(error, null)
  })
  req.end()
}

VERBS.forEach(function (verb) {
  Ebay.prototype[verb] = function (service, params, cb) {
    return this.makeRequest(verb, service, params, cb)
  }
})