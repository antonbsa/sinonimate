const express = require('express')
const app = express()
const cheerio = require('cheerio')

const request = require('request-promise')
const { send } = require('process')
const hostname = 'https://www.sinonimos.com.br/'
const path = 'teste'

let body = ''

request(`${hostname}${path}`, function(err, response, bd) {
  body = bd
  console.log(body)
  console.log('Ok!')
})

const $ = cheerio.load(body)
console.log($)
const port = 3000

app.get('/', function (req, res) {
  
})

app.listen(port, function () {
  console.log(`App rodando em http://localhost:${port}`)
})