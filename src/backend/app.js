const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')
const { send } = require('process')
const app = express()



    const hostname = 'https://www.sinonimos.com.br/'
    const path = 'sentido'
    
    request({url: `${hostname}${path}`, encoding: 'binary'}, function(err, response, body) {

        if (err) return console.error(err)

        let $ = cheerio.load(body)
        
        let sinonimos = {}

        $('.s-wrapper').each(function() {
            let sentido = cheerio.load($(this).html())('div.sentido').text()
            let aux = sentido.substring(0, sentido.length - 1)
            sentido = aux
                let arraySin = []
            cheerio.load($(this).html())('a.sinonimo').each(function (){
                arraySin.push($(this).text())
            })
            sinonimos[`${sentido}`] = arraySin
        })
        console.log(sinonimos)
        
    })
    
    
app.get('/', function (req, res) {
})

const port = 3000

app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`)
    console.log()   //distanciar
})