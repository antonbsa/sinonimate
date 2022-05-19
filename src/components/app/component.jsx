import { useState } from "react";
import DataList from "../DataList";

import appService from './service';
import styles from './style.module.css'

export default function App() {
  const [inputValue, setInputValue] = useState();
  // no plural, mas ta sendo passado p component uma palavra só
  const [words, setWords] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);

  async function handleRequest() {
    if (inputValue.length === 0) return;

    try {
      // const { data } = await axios.get(`/api/${fullExpression}`);
      const data = await appService.getExpressionSynonyms(inputValue);
      const isEmptyResponse = Object.keys(data).length === 0;
      if (isEmptyResponse) {
        setWasSearched(true);
        // TODO tratar aqui o aviso na UI
        return;
      }

      setWords([
        // ...words,
        {
          wordValue: inputValue,
          synonyms: data,
        }
      ]);
      setWasSearched(true);
    } catch (err) {
      console.log('deu erro: ', err);
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div>
          <h1>SinoniMate</h1>
        </div>
        <div className="search-field">
          <input name="q" id="q" onChange={e => setInputValue(e.target.value)} type="text" placeholder="Sinônimos de:" required />
          <button id="button" onClick={handleRequest}>
            Procurar
          </button>
        </div>
      </div>
      <div className="content">
        <section id="content">
          <div id="loading">
            {/* <img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif" /> */}
          </div>
          <div id="list"></div>
          {
            wasSearched &&
            words.map(word => <DataList key={word.wordValue} word={word} />)
          }
        </section>
      </div>
    </div>
  )
}