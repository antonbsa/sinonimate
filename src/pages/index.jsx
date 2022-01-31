import { useState } from "react";
import axios from "axios";

import DataList from '../components/DataList';

import Head from 'next/head';
import styles from '../styles/pages/Home.module.css'


export default function Home() {
  const [inputValue, setInputValue] = useState();
  // no plural, mas ta sendo passado p component uma palavra só
  const [words, setWords] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);

  async function handleRequest() {
    const fullExpression = inputValue.trim().replace(' ', '+');

    // TODO: warnn need a word OR block search button
    // if (concatWords.length === 1 && !concatWords[0]) return;
    if (fullExpression.length === 0) return;

    try {
      const { data } = await axios.get(`/api/${fullExpression}`);
      const isEmptyResponse = Object.keys(data).length === 0;
      if (isEmptyResponse) {
        setWasSearched(true);
        return;
      }

      setWords([
        // ...words,
        {
          wordValue: fullExpression,
          synonyms: data,
        }
      ]);
      setWasSearched(true);
    } catch (err) {
      console.log('deu erro: ', err);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SinoniMate</title>
      </Head>
      <div className="header">
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
        </section>
      </div>
      { }
      <br />
      {wasSearched &&
        words.map(word => <DataList key={word.wordValue} word={word} />)
      }
      <footer className={styles.footer}>Fim da página</footer>
    </div>
  )
}