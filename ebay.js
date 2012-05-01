var http = require('http')
  , querystring = require('querystring')
  , url = require('url')

//  Ebay Service Endpoints
var SERVICES = {
  finding: 'http://svcs.ebay.com/services/search/FindingService/v1'
}

//  parse Service Endpoints
Object.keys(SERVICES).forEach(function (key) {
  SERVICES[key] = url.parse(SERVICES[key])
})

//  Allowed http verbs
var VERBS = ['get', 'post']

module.exports = Ebay

function Ebay (opts) {
  this.opts = opts
}

Ebay.prototype.makeRequest = function (verb, service, params, cb) {
  if(typeof params === 'function') {
    cb = params
    params = null
  } else if(typeof cb !== 'function') {
    throw new Error('must provide callback')
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

  var qs = querystring.stringify(params)

  var opts = {
    host: svc.host
  , path: svc.path + '?' + qs
  , method: verb.toUpperCase()
  , headers: {
      'X-EBAY-SOA-REQUEST-DATA-FORMAT': 'JSON'
    }
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