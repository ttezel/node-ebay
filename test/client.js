var Ebay = require('../ebay')

var ebay = new Ebay()

var params = {
  'OPERATION-NAME': 'findItemsByKeywords'
, 'SECURITY-APPNAME': ''  
}

ebay.get('finding', params, function (err, data) {
  if(err) throw err
  console.log('data', data)
})