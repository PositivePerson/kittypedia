import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Cards from '../components/photos/Cards';
import ChooseSectionButtons from '../components/layout/ChooseSectionButtons';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default function Main() {

    const [cardsDisplayFormat, setCardsDisplayFormat] = useState(true);
    const [APIFetched, setAPIFetched] = useState(true);

    const btnFloatBox = {
        position: "absolute",
        right: "1.5em",
        top: "1.5em",
    }

    const btnFloat = {
        position: "sticky",
        display: "flex",
        left: "calc(100% - 3.5em)",
        top: "1.5em",
        zIndex: "999",

        width: "2em",
        height: "2em",

        outline: "none",
        fontSize: "1.9em"
    }

    const Emoji = styled.span`
    font-size: .9em;
  `;

    return (
        <div className={styles.container}>
            <Head>
                <title>Where the cats become from</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.App}>
                <div className={styles.AppContainer}>

                    {APIFetched &&
                        <>
                            <Button style={btnFloat} onClick={() => setCardsDisplayFormat(!cardsDisplayFormat)} color="secondary">{cardsDisplayFormat ? <i className="fas fa-th"></i> : <i class="fas fa-bars"></i>}</Button>
                            <h1>Caturday</h1>
                            <h4 className="desc">Provide kitty stuff for every occasion <Emoji>😸</Emoji></h4>
                            {/* <a href="/api/getacat?filename=nt.jpg" alt="a cat" download>
              download a file
            </a> */}
                            <Cards cardsDisplayFormat={cardsDisplayFormat} />
                        </>
                    }
                    {!APIFetched &&
                        <ChooseSectionButtons setAPIFetched={setAPIFetched} APIFetched={APIFetched} />
                    }

                </div>

            </div>

        </div>
    )
}