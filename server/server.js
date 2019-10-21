const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(express.static('client/public'))

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)