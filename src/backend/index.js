const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')
const cors = require('cors')
const path = require('path')

const app = express()

app

const hostname = 'https://www.sinonimos.com.br/'
const port = 3000

app

.use(cors())
.use(express.static(path.join(__dirname, '../frontend')))
.use(express.json())

.get('/:word', function (req, res) {
    const { word } = req.params
    
    request({url: `${hostname}${word}`, encoding: 'binary'}, function(err, response, body) {
        
        if (err) return console.error(err)
        
        let $ = cheerio.load(body)
        
        let sinonimos = {}
        
        function catchSinonimos () {
            $('.s-wrapper').each(function() {
                let sentido = cheerio.load($(this).html())('div.sentido').text()
                let aux = sentido.substring(0, sentido.length - 1).toLowerCase()
                sentido = aux
                let arraySin = []
                
                cheerio.load($(this).html())('a.sinonimo').each(function (){
                arraySin.push($(this).text())
            })
            sinonimos[`${sentido}`] = arraySin
        })
        return sinonimos
    }
    return res.json(catchSinonimos())

})
    
})
.get('/', function (req, res) {
    res.render('index')
})
.listen(process.env.PORT || port, function () {
    console.log(`App rodando em http://localhost:${port}`)
    console.log()   //distanciar
})