import { useState, useContext, useEffect, useRef } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

import CardItem from '../components/photos/CardItem';
import Cards from '../components/photos/Cards';
import ChooseSectionButtons from '../components/layout/ChooseSectionButtons';
import useWindowSize from '../components/layout/getDevicesSize';

import TumblrCatsContext from '../context/tumblrCats/tumblrCatsContext';

import styled from 'styled-components';

import { animate, motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import { ToastContainer, toast, Flip } from 'react-toastify';

const MenuButtons = styled.div`
position: relative;
    display: inline-block;
    overflow: hidden;
    
    width: 17em;
    line-height: 3em;

    ${({ deviceWidth }) => (deviceWidth < 576) && `
        width: 100vw;
        height: 3rem;
    `}

    & > div {
        display: inline-block;
        position: absolute;

        transition: transform 0.3s ease-out;

        ${({ deviceWidth }) => (deviceWidth < 576) && `
            width: 100%;
            display: flex;
            justify-content: center;
        `}
    }

    & .closed {
        ${({ deviceWidth }) => (deviceWidth > 576) && `
            transform: translate(-100%, 0);
        `}
    }

    & .open {
        transform: translate(0, 0);
    }

    & div > span {
        ${({ deviceWidth }) => (deviceWidth < 576) ? `
            padding-right: 1rem;
            padding-left: 1rem;
        ` : (deviceWidth < 768) ? `
            padding-left: 1.5rem;
        ` : `
            padding-left: 1.8rem;
        `}
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
    ${({ deviceWidth }) => (deviceWidth > 576) && `
        position: absolute !important;
        left: 10%;
        `}
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

    ${({ deviceWidth }) => (deviceWidth < 576) && `
        display: none !important;
    `}

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

    ${({ deviceWidth }) => (deviceWidth < 576) && `
        display: flex;
        flex-direction: column-reverse;
    `}
`;

const Title = styled.h1.attrs({
    className: 'mt-4'
})`
    ${({ deviceWidth }) => (deviceWidth < 768) && `
        font-size: 3.6rem !important;
    `}

    cursor: pointer;
    z-index: 25;

    margin-left: 50%;
    transform: translate(-50%, 0);

    transition: margin-left .3s ease-out;

     ${({ open, deviceWidth }) => open && (deviceWidth < 768) && `
         margin-left: 77% ;
     ` ||
        open && (deviceWidth < 992) && `
         margin-left: 70% ;
     `
    }


`;

const Footer = styled.div`
    position: absolute;
    bottom: 2rem;

    width: 100%;
    padding: 0 5em;

    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({ deviceWidth }) => (deviceWidth < 756) && `
        flex-direction: column;
    `}
`;

const Girl = styled.span`

    ${({ deviceWidth }) => (deviceWidth > 756) && `
        position: absolute;
        bottom: -2.5rem;
        left: 0;
    `}

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
    const photoBtn = useRef(null)
    const gifBtn = useRef(null)
    const refresh = useRef(null)

    const size = useWindowSize();

    useEffect(() => {
        if (cats.length === 0) {
            ReloadResults(contentType);
        }
    }, [cats])

    useEffect(() => {
        if (size.width < 576) {
            setTimeout(() => {
                menuRef.current.click();
            }, 600);
        } else {
            setMenuOpen(false);
        }

        const btnShortcutHandler = (event) => {
            if (photoBtn.current && event.keyCode === 80) {
                photoBtn.current.disabled ?
                    notify(photoBtn) : photoBtn.current.click();
            } else if (gifBtn.current && event.keyCode === 71) {
                gifBtn.current.disabled ?
                    notify(gifBtn) : gifBtn.current.click();
            } else if (gifBtn.current && event.keyCode === 82) {
                refresh.current.click();
            }
        };
        window.addEventListener('keydown', btnShortcutHandler);
        return () => {
            window.removeEventListener('keydown', btnShortcutHandler);
        };
    }, [])

    const notify = (btnType) => {
        if (!toast.isActive(btnType.toString())) {
            toast.warning(<div>You are already there! To refresh use <strong>R</strong></div>, {
                position: "top-right",
                // autoClose: 2500,
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip,
                toastId: btnType.toString()
            });
        }
    }

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
                    <title>XD</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="App">

                    <TitleRow className={`row w-100 mx-0 ${size.width < 576 ? 'pt-3' : ' pt-5'}`} deviceWidth={size.width}>
                        <Menu
                            open={menuOpen}
                            deviceWidth={size.width}
                        >

                            <MenuIcon
                                variant="contained"
                                color="secondary"
                                onClick={() => setMenuOpen(!menuOpen)}
                                ref={menuRef}
                                deviceWidth={size.width}
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
                            <MenuButtons deviceWidth={size.width}>
                                <div
                                    className={!menuOpen ? "closed" : "open"}
                                >
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn disabled={contentType === 'photo'} size="small" onClick={firePhotoSection} ref={photoBtn}>PHOTOS</Btn>
                                            {/* PHOTOS */}
                                        </span>
                                    </Link>
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn disabled={contentType === 'gifs'} size="small" onClick={fireGifsSection} ref={gifBtn}>GIFS</Btn>
                                        </span>
                                    </Link>
                                    <Link href="/main_updated">
                                        <span>
                                            <Btn size="small" onClick={ReloadResults} ref={refresh}>
                                                <img alt="Refresh results" src="/refresh.svg" />
                                            </Btn>
                                        </span>
                                    </Link>
                                </div>
                            </MenuButtons>
                        </Menu>
                        {/* <Menu type="image/svg+xml" data="/menu.svg">svg-animation</Menu> */}

                        <Link href="/">
                            <Title open={menuOpen} deviceWidth={size.width}>
                                Caturday
                            </Title>
                        </Link>
                    </TitleRow>

                    <motion.div
                        animate={(menuOpen && size.width < 992) ? {
                            x: 50,
                            opacity: 0
                        } : {
                            x: 0,
                            opacity: 1
                        }}
                        transition={{
                            ease: "easeOut",
                            duration: 0.3
                        }}
                    >
                        <h4 className="mt-4" style={{ display: `${size.width < 576 ? 'none' : 'block'}` }}>Provide kitty stuff for every occasion</h4>
                    </motion.div>
                    {cats.length > 0 &&
                        <Cards />
                    }

                    <Footer deviceWidth={size.width}>
                        <div style={{ position: "relative" }}>
                            <Girl deviceWidth={size.width}>
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