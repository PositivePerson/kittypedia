import React, { useState, useEffect, useRef } from 'react'

import Image from "next/image";

import styles from '../../styles/CardsAndButtons.module.css';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Download = styled.button`
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    z-index: 99;
    border-radius: 50% !important;

    &:hover: {
        background: rgba(134, 134, 134, 0.5) !important;
      }
`;

const DownloadLayer = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: grab;

      background: rgb(110, 110, 160, .4);
      opacity: 0;

      &:hover {
          opacity: 1;
      }

      & img:hover {
        cursor: pointer;
      }

      transition: opacity .3s ease-out;
    //   transition: transform 0.3s ease-out;
`;

// const Img = styled(Image)`
//             ${props.thumbnail && 'border: 1px solid red;'}        

//             min-width: unset !important;
//             min-height: unset !important;

//             width: 36px !important;
//             height: 36px !important;
// `;

const Img = styled(Image)(props => {
    if (props.thumbnail) return ({
        minWidth: "unset !important",
        minHeight: "unset !important",

        width: "36px !important",
        height: "36px !important",

        margin: "2rem 0 0 0 !important",
        left: "50% !important",
        transform: "translate(-50%, 0) !important",
    });
    if (!(props.thumbnail)) return ({
        // border: "1px solid red !important"
        // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        maxHeight: "100%"
    })
});

const Btn = styled(Button)`
    && {
        min-width: unset;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
    }
`;

const CardItem = ({ cat, thumbnail }) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    const inputRef = React.useRef(null)

    const downloadFile = () => {
        inputRef.current.click();
    }

    useEffect(() => {
        if (cat[0]) {
            console.log("Cat from cardItem", cat);
        }
    }, [cat])

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

                {/* <img className={`card-img ${styles.cardImg}`} src={cat.url} alt="" /> */}
                {/* <div className={styles.cardImg}> */}
                <div style={{ maxWidth: `${thumbnail ? "2rem" : "26rem"}`, maxHeight: `${thumbnail ? "2rem" : "26rem"}`, filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", height: `${thumbnail ? "2rem" : "unset"}`, width: `${thumbnail ? "2rem" : "unset"}` }}>
                    {!thumbnail && (
                        <Img
                            className={`card-img thumbnailImgStyle`}
                            src={cat.url}
                            alt="A cat"
                            width={cat.width}
                            height={cat.height}
                            layout="intrinsic"
                            quality={25}

                            thumbnail={thumbnail}
                        />
                    )}
                    {thumbnail && (
                        <img src={cat.url} alt="" style={{ maxHeight: "100%" }} />
                        // <Img
                        //     className={`card-img thumbnailImgStyle`}
                        //     src={cat.url}
                        //     alt="A cat"
                        //     width={cat.width}
                        //     height={cat.height}
                        //     layout="intrinsic"
                        //     quality={25}

                        //     thumbnail={thumbnail}
                        // />
                    )}
                </div>

                {!thumbnail && (
                    <DownloadLayer>
                        {/* <Btn size="small" onClick={downloadFile}> */}
                        <Btn size="small" >
                            <img alt="download" src="/download_icon.svg" />
                        </Btn>
                    </DownloadLayer>
                )}
            </div>
        </div >
    )

}

export default CardItem
