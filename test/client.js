var Ebay = require('../ebay')
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
  console.log('data', data.findItemsByKeywordsResponse[0])
})