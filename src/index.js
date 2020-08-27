const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

app

const hostname = 'https://www.sinonimos.com.br/'
const port = 3000

app

/* .set('views', __dirname + '/views')
.set('view engine', 'html')
.engine('html', require('ejs').renderFile) */

.use(cors())
.use(express.static(path.join(__dirname, '../public')))
.use('/utils', express.static(path.join(__dirname, '/utils')))
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
.get('/', function(req, res){
    fs.readFile('src/views/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end()
    })
   // res.render('index')
})
.listen(process.env.PORT || port, function () {
    console.log(`App rodando em http://localhost:${port}`)
    console.log()   //distanciar
})