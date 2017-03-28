var config = require('../config')
var port = config.port

function Links(title) {
  this.title = title;

  this.getLinks = function() {
    return {
      "item": {
        "rel": "item",
        "href": `http://localhost:${port}/watch-definitions/${title}`
      },
      "delete": {
        "rel": "delete",
        "href": `http://localhost:${port}/watch-definitions/${title}`,
        "title": "Delete",
        "method": "DELETE"
      }
    }
  }
}

module.exports = Links
