import Head from "next/head";

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import { AnimatePresence } from "framer-motion"

import TumblrCatsState from '../context/tumblrCats/tumblrCatsState';

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
      </Head>

      <TumblrCatsState>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </TumblrCatsState>
    </>
  )
}

export default MyApp
