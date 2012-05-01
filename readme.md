#ebay 

Ebay client for node. Make calls to Ebay's http API's.

#Installing

```
npm install ebay
```

#Usage
```javascript
var Ebay = require('ebay')

var ebay = new Ebay()

ebay.get('finding', {}, function (err, data) {
  if(err) throw err

  console.log(data)
})
```

##Methods

There are just 2 methods; `get` and `post` which make **GET** and **POST** requests to Ebay.

* `ebay.get(service, [params], callback)`
* `ebay.post(service, [params], callback)`

##Arguments

* `service`: (String) specifies the Ebay API Service to use. 

  Supported services are:

  * `finding`: [Ebay Finding API](http://developer.ebay.com/DevZone/finding/Concepts/FindingAPIGuide.html)


* `params`: the optional URL parameters object.


* `callback`: `function (err, data)` the callback to be invoked on reply. 