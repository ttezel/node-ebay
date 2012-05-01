var Ebay = require('../ebay')
  , config = require('../config')

var ebay = new Ebay(config)

var params = {
  'OPERATION-NAME': 'findItemsByKeywords'
, 'keywords': 'shoes'
}

ebay.get('finding', params, function (err, data) {
  if(err) throw err
  console.log('data', data)
})