var express = require('express'),
	path = require('path')


var api = require('./api'),
	middleware = require('./middleware')

var app = express()

//App config

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride())

app.use('/app', express.static(path.join(__dirname, '..', '..', 'app')))

app.use(app.router);
if ('development' == app.get('env'))
	app.use(express.errorHandler())

//Routes

app.get('/', api.redirect)
app.get('/api', api.api)

//API
app.get('/api/plugins/active', middleware.json, api.getPlugins)
app.get('/api/plugins/all', middleware.json, api.listPlugins)

app.get('/plugin/:name/*', api.pluginStatic)

app.post('/api/plugin/:name/:uuid', middleware.json, api.setPlugin)
app.post('/api/order', middleware.json, api.setOrder)

app.get('/api/time', middleware.json, api.getHour)
app.post('/api/time', middleware.json, api.setHour)


module.exports = exports = app
