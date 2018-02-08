const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const fs = require('fs')
const yaml = require('js-yaml')
const util = require('util')

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Disable Caching
app.use((req, res, next)=>{
  res.header('Cache-Control', 'no-cache')
  next()
})

app.use(express.static(STATIC_PATH))

let profile = {
  savedRequests: []
}

app.get('/api/profile', (req, res, next)=>{
  res.json(profile)
})

app.put('/api/profile', (req, res, next)=>{
  profile = req.body
  res.json(profile)
})

app.get('/api/fruits', (req, res, next) =>{
  res.json({
    results: [
      {name: 'banana', displayName: 'Banana'},
      {name: 'apple', displayName: 'Apple'},
      {name: 'orange', displayName:'Orange'}
    ],
    count: 3,
    page: 1,
    pages: 1,
    limit: 10,
    query: req.query
  })
})

app.use('/api', (req, res, next) =>
  res.status(404).json({message: 'Route does not exist'}))

//main route
app.use((req, res, next)=>{
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>API Tool</title>
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
  next()
});

const server = http.listen(PORT, () =>{
  console.log('listening on port 8080')
  server.keepAliveTimeout = 0
});
