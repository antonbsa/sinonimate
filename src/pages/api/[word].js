const cheerio = require('cheerio');
const axios = require('axios');

export default async function getSynonyms(req, res) {
  const { word } = req.query;
  const hostname = 'https://www.sinonimos.com.br/busca.php?q='

  const response = await axios({
    url: `${hostname}${word}`,
    method: 'get',
    responseEncoding: 'binary'
  })

  const $ = cheerio.load(response.data);
  const sinonimos = {};

  $('.s-wrapper').each(function () {
    let sentido = cheerio.load($(this).html())('div.sentido').text();
    const aux = sentido.substring(0, sentido.length - 1).toLowerCase();
    sentido = aux;
    const arraySin = [];

    cheerio.load($(this).html())('a.sinonimo').each(function () {
      arraySin.push($(this).text());
    })
    sinonimos[`${sentido}`] = arraySin;
  })

  return res.json(sinonimos);
}
