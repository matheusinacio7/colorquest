import { Fragment } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header';
import Game from '../components/Game';
import Article from '../components/Article';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>ColorQuest</title>
      </Head>

      <main>
        <Header />
        <Game />
        <Footer style='main' />
      </main>

      <Article />
      <Footer style='alt' />
    </Fragment>
  )
}
