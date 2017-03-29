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

  this.getDefaultListLink = function(max) {
    return {
      "create": {
        "rel": "create",
        "href": `http://localhost:${port}/watch-definitions/creation.drive`,
        "title": "Create"
      },
      "search": {
        "rel": "search",
        "href": `http://localhost:${port}/watch-definitions/search.drive`,
        "title": "Search",
        "method": "POST",
        "type": "application/json",
        "$ref": "#/definitions/SearchWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": `http://localhost:${port}/watch-definitions.drive?offset=0&max=${max}`
      }
    }
  }
}

module.exports = Links
