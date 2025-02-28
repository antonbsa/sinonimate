const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');
const { Buffer } = require('buffer');

export default async function getSynonyms(req, res) {
  try {
    const { word } = req.query;
    const hostname = 'https://www.sinonimos.com.br/'

    const response = await axios({
      url: `${hostname}${word}`,
      method: 'get',
      responseEncoding: 'binary',
      responseType: 'arraybuffer',
    })

    // convert the response data to a readable format
    const decodedData = iconv.decode(Buffer.from(response.data), 'utf-8');
    const $ = cheerio.load(decodedData);
    const synonyms = {};

    // iterate over each group of synonyms avoiding the last one (rewrite item)
    $('.content-detail').not('.mb--30').each(function () {
      const sense = $(this).find('.content-detail--subtitle').text().slice(0, -1);

      const words = [];
      $(this).find('.sinonimo').each(function () {
        words.push($(this).text());
      })

      synonyms[sense] = words;
    })

    return res.json({ data: synonyms });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
