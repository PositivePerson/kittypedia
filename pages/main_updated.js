import { useState, useContext, useEffect, useRef } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

import CardItem from '../components/photos/CardItem';
import Cards from '../components/photos/Cards';
import ChooseSectionButtons from '../components/layout/ChooseSectionButtons';

import TumblrCatsContext from '../context/tumblrCats/tumblrCatsContext';

import styled from 'styled-components';

import { animate, motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";

const MenuButtons = styled.div`
position: relative;
    display: inline-block;
    overflow: hidden;
    
    width: 17em;
    line-height: 3em;

    & > div {
        display: inline-block;
        position: absolute;

        transition: transform 0.3s ease-out;
    }

    & .closed {
        transform: translate(-100%, 0);
    }

    & .open {
        transform: translate(0, 0);
    }

    & div > span {
        padding-left: 1.8rem;
        // font-size: .85em;

        cursor: pointer;
    }

    & div span {
        color: #413246;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }
`;

const Btn = styled(Button)`
  && {
        fontFamily: 'Poppins', sans-serif;
        min-width: unset;
  }
`;

const Menu = styled.div`
    display: flex;
    position: absolute !important;
    left: 10%;
    bottom: 1em;
    
    // width: 15em;
    line-height: 3.5em;

    text-align: start;
    // overflow: hidden;
    
    transition: transform 0.3s ease-out;

    z-index: 20;

    ${({ open }) => open && `
        transform: translate(-10px, 0);
        z-index: 30;
    `}

`;

const MenuIcon = styled(Button)`

    z-index: 99;

    width: 3.5em;
    height: 3.5em;

    background: rgb(88,104,152);
    background: linear-gradient(135deg, rgba(88,104,152,1) 0%, rgba(215,125,158,1) 50%, rgba(254,231,133,1) 100%); 

    border-radius: 25% !important;
    min-width: unset !important;

    & .MuiIcon-root {
        font-size: .5rem;

        height: unset;
        width: unset;
    }

    & .MuiButton-label {
        width: unset;
    }

    & img {
        width: 1.5rem;
    }
`;

const TitleRow = styled.div`
    position: relative;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 2rem;

    width: 100%;
    padding: 0 5em;

    display: flex;
    // -webkit-flex-direction: row-reverse; 
    display: flex;
    align-items: center;
    justify-content: space-between;

    // & div .muiIcon-root {
    //     width: unset;
    //     height: unset;
    // }
`;

const Girl = styled.span`
    position: absolute;
    bottom: -2.5rem;
    left: 0;

    z-index: 1;

    & img {
        width: calc(30vw + 2rem);
    }
`;

const leftFadeIn = {
    initial: {
        x: 120,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 2,
            ease: "easeOut"
        }
    }
}

export default function Main_updated() {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading, searchCats, contentType } = tumblrCatsContext;

    const [menuOpen, setMenuOpen] = useState(true);

    const menuRef = useRef(null);

    useEffect(() => {
        if (cats.length === 0) {
            ReloadResults(contentType);
        }
    }, [cats])

    useEffect(() => {
        setTimeout(() => {
            menuRef.current.click();
        }, 600);
    }, [])

    const firePhotoSection = () => {
        searchCats("photo");
    }

    const fireGifsSection = () => {
        searchCats("gifs");
    }

    const ReloadResults = () => {
        searchCats(contentType);
    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div>
                <Head>
                    <title>Kici kici kici</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="App">

                    <TitleRow className="row w-100 pt-5 mx-0">
                        <Menu
                            open={menuOpen}
                        >

                            <MenuIcon
                                variant="contained"
                                color="secondary"
                                onClick={() => setMenuOpen(!menuOpen)}
                                ref={menuRef}
                            >
                                {/* <Button
                            variant="contained"
                            color="secondary"
                            startIcon={svgIcon}
                            >
                            
                        </Button> */}
                                {/* <Icon> */}
                                <img alt="menu" src="/menu.svg" />
                                {/* </Icon> */}
                            </MenuIcon>
                            <MenuButtons>
                                <div
                                    className={!menuOpen ? "closed" : "open"}
                                >
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn disabled={contentType === 'photo'} size="small" onClick={firePhotoSection}>PHOTOS</Btn>
                                            {/* PHOTOS */}
                                        </span>
                                    </Link>
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn disabled={contentType === 'gifs'} size="small" onClick={fireGifsSection}>GIFS</Btn>
                                        </span>
                                    </Link>
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn size="small" onClick={ReloadResults}>
                                                <img alt="Refresh results" src="/refresh.svg" />
                                            </Btn>
                                        </span>
                                    </Link>
                                </div>
                            </MenuButtons>
                        </Menu>
                        {/* <Menu type="image/svg+xml" data="/menu.svg">svg-animation</Menu> */}

                        <Link href="/">
                            <h1 className="mx-auto mt-4" style={{ cursor: "pointer", zIndex: "25" }}>
                                Caturday
                            </h1>
                        </Link>
                    </TitleRow>

                    <h4 className="mt-4">Provide kitty stuff for every occasion</h4>
                    {cats.length > 0 &&
                        // <CardItem cat={cats[0]} />
                        <Cards />
                    }

                    <Footer>
                        <div style={{ position: "relative" }}>
                            <Girl>
                                <img alt="Chillin girl icon" src="/chilling_girl.svg" />
                            </Girl>
                        </div>
                        <motion.div initial="initial" animate="animate" transition="transition">
                            <motion.div variants={leftFadeIn}>
                                {/* <h5>© 2020 Bartosz Gałaszewicz. All rights reserved.</h5> */}
                                <h5>© 2020 Caturday. All rights reserved.</h5>
                            </motion.div>
                        </motion.div>
                    </Footer>

                </div>

            </div>
        </motion.div>
    )
}