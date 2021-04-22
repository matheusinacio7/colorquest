import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import * as _ from 'lodash';
import styles from '../styles/Home.module.css';

import Header from '../components/Header';
import Game from '../components/Game';
import Article from '../components/Article';
import Footer from '../components/Footer';

export default function Home() {
  const fixMainHeight = () => {
    console.log('resizing');
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    fixMainHeight();

    window.addEventListener('resize', _.throttle(fixMainHeight, 200));

    return () => window.removeEventListener('resize', _.throttle(fixMainHeight, 200));
  }, [fixMainHeight])

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
