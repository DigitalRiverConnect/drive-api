var watchDefinitions = require('./resources/list')
var creationPage = require('./resources/creation')
var Links = require('./resources/links.js')
var Pagination = require('./resources/pagination')
var PageLink = require('./resources/page.link')
var entities = require('./resources/entities')
var definitions = require('./resources/definitions')
var schema = require('./resources/definition.schema')

module.exports = {
  list: function(query) {
    watchDefinitions = addLinks(watchDefinitions, query);
    watchDefinitions.entities['watch-definitions'] = entities.slice(query.offset, +query.offset + +query.max);
    return watchDefinitions
  },
  get: function(name) {
    var definition = definitions[name];

    // FIXME harcoded max = 10 should be fix
    definition.links = ((new Links())).getWatchDefinitionLink(name, 10)
    return definition;
  },
  getCreationPage: function() {
    return creationPage;
  },
  create: function(body) {
    var existDefinition = entities.filter(function (item) {
      return item.title === body.definition.name
    })

    if (existDefinition.length === 0) {
      entities.push(makeEntity(body));
      definitions[body.definition.name] = makeDefinition(body);
    }
    else {
      throw `${body.definition.name} already exist`

    }
  },
  update: function(body) {
    var existDefinition = entities.filter(function (item) {
      return item.title === body.definition.path
    })

    if (existDefinition.length === 1) {
      var index = entities.indexOf(existDefinition[0])
      entities[index] = makeEntity(body);
      definitions[body.definition.path] = makeDefinition(body);
    }
    else {
      throw `${body.definition.name} doesn't exist`
    }
  },
  delete: function(name) {
    entities = entities.filter(function (item) {
      return item.title !== name;
    })
  }

}

var makeEntity = function(body) {
  if (body.definition.path === undefined || body.definition.path === null ||
        body.definition.path === '') {
    body.definition.path = body.definition.name;
  }

  var definition = {
    title: body.definition.path,
    links: new Links().getEntityLinks(body.definition.path),
    data: body.definition,
    $ref: '#/definitions/WatchDefinition'
  }
  return definition;
}

var addLinks = function(watchDefinitions, query) {
  watchDefinitions.links = new Links().getListLink();
  watchDefinitions = addPagination(watchDefinitions, query);
  return watchDefinitions;
}

var addPagination = function(watchDefinitions, query) {
  var total = entities.length;
  var pages = Math.ceil(total / query.max);
  var currentPage = (query.offset > 0) ? (query.offset / query.max) + 1 : 1;
  watchDefinitions.data = (new Pagination(total, pages, currentPage)).getPagination();
  for (var i = 1 ; i <= pages ; i++) {
    watchDefinitions.links[`page-${i}`] = (new PageLink()).getPage(i, query.max);
  }

  watchDefinitions.links[`first`] = (new PageLink()).getLink('first', 0, query.max);
  watchDefinitions.links[`last`] = (new PageLink()).getLink('last', (pages - 1) * query.max, query.max);
  if (pages != currentPage) watchDefinitions.links[`next`] = (new PageLink()).getLink('next', currentPage * query.max, query.max);
  if (query.offset != 0) watchDefinitions.links[`prev`] = (new PageLink()).getLink('prev', (pages - 2) * query.max, query.max);

  return watchDefinitions;
}

var makeDefinition = function(body) {
  return {
    links: {},
    data: body.definition,
    schema: schema
  };
}