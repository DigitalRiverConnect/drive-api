var config = require('../config')
var port = config.port

function PageLink(pageNumber, max) {
  this.pageNumber = pageNumber;
  this.max = max;

  this.getPage = function() {
    var offset = 0;
    if (pageNumber > 0) offset = (this.pageNumber - 1) * 10;
    return {
      "rel": `page-${pageNumber}`,
      "href": `http://localhost:${port}/watch-definitions.drive?offset=${offset}&max=${max}`,
      "title": `${pageNumber}`
    }
  }
}

module.exports = PageLink