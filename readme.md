#ebay 

Ebay client for node. Make calls to Ebay's http API's.

#Installing

```
npm install ebay
```

#Usage
```
var Ebay = require('ebay')

var ebay = new Ebay()

ebay.get('finding', {}, function (err, data) {
  if(err) throw err

  console.log(data)
})
```

##What Ebay Services do I have access to?

[Ebay Finding API](http://developer.ebay.com/DevZone/finding/Concepts/FindingAPIGuide.html)