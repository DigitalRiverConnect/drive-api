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
    var cloneEntities = entities.slice()
    if ('search' in query) {
      cloneEntities = filter(cloneEntities, searchByQueryString(query.search));
    }
    return getWatchDefinitions(cloneEntities, query)
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
      return item.links.item.title === body.definition.name
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
      return item.links.item.title === body.definition.name
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
      return item.links.item.title !== name;
    })
  },
  search: function(query) {
    var cloneEntities = entities.slice()
    cloneEntities = filter(cloneEntities, searchByPostBody(query.search));
    return getWatchDefinitions(cloneEntities, query)
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

var addLinks = function(watchDefinitions, query, total) {
  watchDefinitions.links = new Links().getListLink(query.max);
  watchDefinitions = addPagination(watchDefinitions, query, total);
  return watchDefinitions;
}

var addPagination = function(watchDefinitions, query, total) {
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

var filter = function(cloneEntities, fn) {
  return cloneEntities.filter(fn);
}

var searchByPostBody = function(search) {
  return function (entity) {
    return entity.links.item.title.toLowerCase().indexOf(search.terms.name.toLowerCase()) > -1;
  };
}

var searchByQueryString = function(search) {
  return function (entity) {
    return entity.links.item.title.toLowerCase().indexOf(search.terms.split(":")[1].toLowerCase()) > -1;
  }
}

var getWatchDefinitions = function(cloneEntities, query) {
  watchDefinitions = addLinks(watchDefinitions, query, cloneEntities.length);
  watchDefinitions.entities['watch-definitions'] = cloneEntities.slice(query.offset, +query.offset + +query.max);
  return watchDefinitions
}