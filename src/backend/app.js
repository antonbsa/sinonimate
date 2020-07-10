const express = require('express')
const app = express()
const cheerio = require('cheerio')

const request = require('request-promise')
const { send } = require('process')
const hostname = 'https://www.sinonimos.com.br/'
const path = 'teste'


request({url: `${hostname}${path}`, encoding: 'binary'}, function(err, response, body) {

if (err) return console.error(err)

let $ = cheerio.load(body)

console.log('Sentidos:')
let sentido = $('div.sentido').each( function () {
    console.log(`${$(this).text().replace(':', '')};`)
})

console.log()   //distanciar
console.log('Sinonimos:')
let sinonimos = $('a.sinonimo').each(function () {
    console.log(`${$(this).text()};`)
})

// console.log(sinonimos.text())
})




const port = 3000

app.get('/', function (req, res) {

})

app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`)
    console.log()   //distanciar
})