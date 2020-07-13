const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')
const { send } = require('process')

const app = express()

const hostname = 'https://www.sinonimos.com.br/'


app.get('/:word', function (req, res) {
    const { word } = req.params
    
    request({url: `${hostname}${word}`, encoding: 'binary'}, function(err, response, body) {
        
        if (err) return console.error(err)
        
        let $ = cheerio.load(body)
        
        let sinonimos = {}
        
        function catchSinonimos () {
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
        return sinonimos
        // console.log(sinonimos)
    }

    res.send(catchSinonimos())
    
    })
    
})

app.get('/', function (req, res) {
    res.send('OK')
})

const port = 3000
app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`)
    console.log()   //distanciar
})