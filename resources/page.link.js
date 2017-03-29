var config = require('../config')
var port = config.port

function PageLink() {
  this.getPage = function(pageNumber, max) {
    var offset = 0;
    if (pageNumber > 0) offset = (pageNumber - 1) * max;

    return {
      "rel": `page-${pageNumber}`,
      "href": `http://localhost:${port}/watch-definitions.drive?offset=${offset}&max=${max}`,
      "title": `${pageNumber}`
    }
  }

  this.getLink = function(title, offset, max) {
    return {
      "rel": title,
      "href": `http://localhost:${port}/watch-definitions.drive?offset=${offset}&max=${max}`,
      "title": title.charAt(0).toUpperCase() + title.slice(1)
    }
  }
}

module.exports = PageLink