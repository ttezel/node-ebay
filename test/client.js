var Ebay = require('../ebay')

var ebay = new Ebay({
  app_id: '...'
})

var params = {
  'OPERATION-NAME': 'findItemsByKeywords'
, 'keywords': 'shoes'
}

ebay.get('finding', params, function (err, data) {
  if(err) throw err
  console.log('data', data)
})