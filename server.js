var restify = require('restify');
var service = require('./service')
var config = require('./config')
const port = config.port;

var server = restify.createServer();
server.use(restify.CORS());
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.pre(restify.pre.userAgentConnection());

var defaultQuery = { offset: 0, max: 10};

function watchDefinitions(req, res, next) {
  res.send(service.list(req.query));
  next();
}

function creationPage(req, res, next) {
  res.send(service.getCreationPage());
  next();
}

function createWatchDefinition(req, res, next) {
  const body = req.body;
  service.create(body);
  res.send(service.list(defaultQuery));
  next();
}

function updateWatchDefinition(req, res, next) {
  const body = req.body;
  service.update(body);
  res.send(service.list(defaultQuery));
  next();
}

function deleteWatchDefinition(req, res, next) {
  const name = req.params.name;
  service.delete(name);
  res.send(service.list(defaultQuery));
  next();
}

function getWatchDefinition(req, res, next) {
  const name = req.params.name;
  res.send(service.get(name))
  next();
}

function searchWatchDefinitions(req, res, next) {
  const body = req.body;
  const xSessionData = req.headers['x-session-data'];
  const parameters = xSessionData.split('&')
  var query = {};
  for (var parameter of parameters) {
    const keyVal = parameter.split('=')
    query[keyVal[0]] = keyVal[1];
  }

  query['search'] = body;
  res.send(service.search(query));
  next();
}

server.opts(/\.*/, function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Session-Data');
  res.send(200);
  next();
})
server.get('/watch-definitions.drive', watchDefinitions);
server.get('/watch-definitions/creation.drive', creationPage);
server.get('/watch-definitions/:name', getWatchDefinition);
server.post('/watch-definitions.drive', createWatchDefinition);
server.put('/watch-definitions.drive', updateWatchDefinition);
server.del('/watch-definitions/:name', deleteWatchDefinition);
server.post('/watch-definitions/search.drive', searchWatchDefinitions);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url)
})
