var config = require('../config')
var port = config.port

function Links(title) {
  this.title = title;

  this.getEntityLinks = function(name) {
    return {
      "item": {
        "rel": "item",
        "href": `http://localhost:${port}/watch-definitions/${name}`
      },
      "delete": {
        "rel": "delete",
        "href": `http://localhost:${port}/watch-definitions/${name}`,
        "title": "Delete",
        "method": "DELETE"
      }
    }
  }

  this.getListLink = function(max) {
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

  this.getWatchDefinitionLink = function(name, max) {
    return {
      "up": {
        "rel": "up",
        "href": `http://localhost:${port}/watch-definitions.drive?offset=0&max=${max}`,
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": `http://localhost:${port}/watch-definitions/${name}`,
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": `http://localhost:${port}/watch-definitions.drive`,
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": `http://localhost:${port}/watch-definitions/${name}`
      }
    }
  }
}

module.exports = Links
