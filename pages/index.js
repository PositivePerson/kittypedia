import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Cards from '../components/photos/Cards';
import ChooseSectionButtons from '../components/layout/ChooseSectionButtons';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default function Home() {

  const [cardsDisplayFormat, setCardsDisplayFormat] = useState(true);
  const [APIFetched, setAPIFetched] = useState(false);

  const btnFloatBox = {
    position: "absolute",
    right: "1.5em",
    top: "1.5em",
  }

  const btnFloat = {
    position: "fixed",
    display: "flex",
    right: "1.5em",
    top: "1.5em",
    zIndex: "999",

    width: "2em",
    height: "2em",

    fontSize: "1.9em"
  }

  const Emoji = styled.span`
    font-size: .9em;
  `;

  return (
    <div className={styles.container}>
      <Head>
        <title>Ps ps ps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {APIFetched &&
          <>
            <Button style={btnFloat} onClick={() => setCardsDisplayFormat(!cardsDisplayFormat)} color="secondary">{cardsDisplayFormat ? <i class="fas fa-th"></i> : <i class="fas fa-align-justify"></i>}</Button>
            <h1>Caturday</h1>
            <h4 className="desc">Provide kitty stuff for every occasion <Emoji>😸</Emoji></h4>
            <a href="/api/getacat?filename=nt.jpg" alt="a cat" download>
              {/* <img src="https://cdn2.thecatapi.com/images/54i.jpg" alt="" /> */}
              download a file
            </a>
            {/* <Cards cardsDisplayFormat={cardsDisplayFormat} /> */}
          </>
        }
        {!APIFetched &&
          <ChooseSectionButtons setAPIFetched={setAPIFetched} APIFetched={APIFetched} />
        }

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
