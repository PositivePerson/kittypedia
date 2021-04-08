import React, { useState, useEffect, useRef } from 'react'

import Image from "next/image";

import Button from '@material-ui/core/Button';
import styles from '../../styles/CardsAndButtons.module.css';

const CardItem = ({ cat, cardsDisplayFormat }) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    const inputRef = React.useRef(null)

    const downloadFile = () => {
        inputRef.current.click();
    }

    useEffect(() => {
        if (error) console.log("Error");
    }, [error])

    return (
        <div className={`${styles.card} card`} key={cat.id}>
            <div className={styles.cardInnerContainer}>

                {/* <a href={`/${cat.url.substr(34)}`} ref={inputRef} target="_blank" download>
                </a> */}

                <a href={`/api/getacat?filename=${cat.url.substr(34)}`} ref={inputRef} alt="a cat" download>
                </a>

                <img className={`card-img ${styles.cardImg}`} src={cat.url} alt="" />
                {/* <Image
                    className={`${styles.cardImg} card-img`}
                    src={cat.url}
                    alt="A cat"
                    width={cat.width}
                    height={cat.height}
                    layout="intrinsic"
                    quality={25}
                /> */}

                <button variant="outlined"
                    type="button"
                    className={` ${styles.btn} ${styles.btnFloating} btn btn-outline-secondary ${cardsDisplayFormat ? styles.btnFloatingOnCards : styles.btnFloatingOnVertical}`}
                    disabled={fetching}
                    onClick={() => downloadFile()}
                    aria-label="download this"
                >
                    <i style={{ fontSize: "1.5em" }} className="fas fa-download" />
                </button>
            </div>
        </div >
    )

}

export default CardItem
