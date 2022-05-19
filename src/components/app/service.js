import axios from 'axios';

async function getExpressionSynonyms(inputValue) {
  const fullExpression = inputValue.trim().replace(' ', '+');

  try {
    const { data } = await axios.get(`/api/${fullExpression}`);

    return data ?? {};
  } catch (err) {
    console.log('deu erro: ', err);
  }
}

export default {
  getExpressionSynonyms,
}
