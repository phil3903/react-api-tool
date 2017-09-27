const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const morgan = require('morgan')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const fs = require('fs')
const yaml = require('js-yaml')

const STATIC_PATH = path.join(__dirname, 'client')
const PORT = 8080

const webpackConfig = require('../webpack.config.js')('dev')
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

//colorized requests
app.use(morgan('dev'))

// Disable Caching
app.use((req, res, next)=>{
  res.header('Cache-Control', 'no-cache')
  next()
})

app.use(express.static(STATIC_PATH))
const FILE_PATH = path.join(__dirname, 'docs/fruits.yaml')

app.get('/api/docs', (req, res, next) => {
  const file = fs.readFileSync(FILE_PATH, 'utf8')
  const doc = yaml.safeLoad(file)
  res.json(doc)
})

app.get('/api/fruits', (req, res, next) =>{
  res.json({
    results: ['Banana', 'Apple', 'Orange'],
    count: 3,
    page: 1,
    pages: 1,
    limit: 10,
    query: req.query
  })
})

app.use('/api', (req, res, next) => res.status(404).json({message: 'Route does not exist'}))

//main route
app.use((req, res, next)=>{
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Dev Template</title>
      <link href="./vendor/favicon.ico"
    </head>
    <body>
      <div id="root"></div>
      <script src="/client.js"></script>
    </body>
    </html>
`)
})

app.use(function (err, req, res, next) {
  console.log(err, req, res)
  next()
});

//socket
const INTERVAL = 3000
io.on('connection', socket => {
  console.log('a user connected')
  setInterval(()=> {socket.emit('event:statusChanged', {status: 1234})}, INTERVAL)
  socket.on('button:wasClicked', data => console.log(data))
})

const server = http.listen(PORT, () =>{
  console.log('listening on port 8080')
  server.keepAliveTimeout = 0
});
