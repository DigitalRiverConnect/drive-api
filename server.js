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
  const definition = req.params.definition;
  service.delete(definition);
  res.send(service.list(defaultQuery));
  next();
}

function getWatchDefinition(req, res, next) {
  const definition = req.params.definition;
  res.send(service.get(definition))
  next();
}

server.get('/watch-definitions.drive', watchDefinitions);
server.get('/watch-definitions/creation.drive', creationPage);
server.get('/watch-definitions/:definition', getWatchDefinition);
server.post('/watch-definitions.drive', createWatchDefinition);
server.put('/watch-definitions.drive', updateWatchDefinition);
server.del('/watch-definitions/:definition', deleteWatchDefinition);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url)
})
