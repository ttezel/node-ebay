var assert = require('assert')
  , util = require('util')
  , Ebay = require('../ebay')
  , config = require('../config')

var ebay = new Ebay(config)

var params = {
  'OPERATION-NAME': 'findItemsByKeywords'
, 'keywords': 'harry potter phoenix'
}

ebay.get('finding', params, function (err, data) {
  if(err) {
    console.log('ERROR', err)
    return
  }
  assert.equal(typeof data, 'object')
  console.log(util.inspect(data.findItemsByKeywordsResponse[0], false, 20, true))
})