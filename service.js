var watchDefinitions = require('./resources/list')
var creationPage = require('./resources/creation')
var Links = require('./resources/links.js')
var Pagination = require('./resources/pagination')
var PageLink = require('./resources/page.link')
var entities = require('./resources/entities')
var definitions = require('./resources/definitions')

module.exports = {
  list: function(query) {
    watchDefinitions = addPagination(watchDefinitions, query);
    watchDefinitions.entities = entities.slice(query.offset, +query.offset + +query.max);
    return watchDefinitions
  },
  get: function(definition) {
    return definitions[definition];
  },
  getCreationPage: function() {
    return creationPage;
  },
  create: function(body) {
    var existDefinition = entities.filter(function (item) {
      return item.title === body.definition.name
    })

    if (existDefinition.length === 0) {
      entities.push(makeDefinition(body));
    }
    else {
      throw `${body.definition.name} already exist`

    }
  },
  update: function(body) {
    var existDefinition = entities.filter(function (item) {
      return item.title === body.definition.name
    })

    if (existDefinition.length === 1) {
      var index = entities.indexOf(existDefinition[0])
      watchDefinitions.entities['watch-definitions'][index] = makeDefinition(body);
    }
    else {
      throw `${body.definition.name} doesn't exist`
    }
  },
  delete: function(definition) {
    entities = entities.filter(function (item) {
      return item.title !== definition;
    })
  }

}

var makeDefinition = function(body) {
  body.definition.path = body.definition.name;
  var definition = {
    title: body.definition.name,
    links: new Links(body.name).getLinks(),
    data: body.definition,
    $ref: '#/definitions/WatchDefinition'
  }
  return definition;
}

var addPagination = function(watchDefinitions, query) {
  var total = entities.length;
  var pages = Math.ceil(total / query.max);
  var currentPage = (query.offset > 0) ? (query.offset / query.max) + 1 : 1;
  watchDefinitions.data = (new Pagination(total, pages, currentPage)).getPagination();
  for (var i = 1 ; i <= pages ; i++) {
    watchDefinitions.links[`page-${i}`] = (new PageLink(i, query.max)).getPage();
  }

  return watchDefinitions;
}