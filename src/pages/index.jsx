import { useState } from "react";
import axios from "axios";

import DataList from '../components/DataList';

import Head from 'next/head';
import styles from '../styles/pages/Home.module.css'
import App from "../components/app/component";


export default function Home() {
  return (
    <>
      <Head>
        <title>SinoniMate</title>
      </Head>
      <div className={styles.container}>
        <App />
        {/* <footer className={styles.footer}>Fim da página</footer> */}
      </div>
    </>
  )
}
