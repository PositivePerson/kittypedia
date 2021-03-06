import React, { useState, useEffect, useContext, useRef } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';
import CardItem from './CardItem';

import styled from 'styled-components';

import Icon from "@material-ui/core/Icon";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Carousel, { Dots, slidesToShowPlugin, arrowsPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const StyledToastContainer = styled(ToastContainer)`
    & > div {
        background: rgba( 255, 177, 150, 0.15 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4.0px );
        -webkit-backdrop-filter: blur( 4.0px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }

    @media (min-width: 576px) {
        top: 4.3rem;
        }
`;

const Cards = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading } = tumblrCatsContext;

    const [value, setValue] = useState(0);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);

    const onChange = value => {
        setValue(value);
    }

    useEffect(() => {
        const arrowClicked = (event) => {
            if (leftArrow.current && event.keyCode === 37) {
                leftArrow.current.click();
            }
            else if (rightArrow.current && event.keyCode === 39) {
                rightArrow.current.click();
            }
        };
        window.addEventListener('keydown', arrowClicked);
        return () => {
            window.removeEventListener('keydown', arrowClicked);
        };
    }, []);

    useEffect(() => {
        if (!window.localStorage.getItem('hintsShown')) {
            toast.info(<div>Be quicker using keyboard!</div>, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });

            toast.info(<div><KeyboardArrowLeftIcon /><KeyboardArrowRightIcon /> for moving forward and backward</div>, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });

            toast.info(<div><strong>P</strong>, <strong>G</strong> and <strong>R</strong> for menu buttons</div>, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });
            window.localStorage.setItem('hintsShown', true);
        }
    }, [])

    if (cats.length === 0) {
        return (
            <div className="w-100">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <div className={`container-flex flex-column justify-content-center`} style={{ position: "relative", zIndex: "50" }}>

                <StyledToastContainer />

                <Carousel
                    value={value}
                    onChange={onChange}
                    plugins={[
                        {
                            resolve: arrowsPlugin,
                            options: {
                                arrowLeft: <button id="left" ref={leftArrow} hidden>Arrow Left</button>,
                                arrowLeftDisabled: <button hidden>Arrow Left Disabled</button>,
                                arrowRight: <button id="right" ref={rightArrow} hidden>Arrow Right</button>,
                                arrowRightDisabled: <button hidden>Arrow Right Disabled</button>,
                                addArrowClickHandler: true,
                            }
                        },
                        // 'infinite',
                        'fastSwipe',
                        // {
                        //     resolve: arrowsPlugin,
                        //     options: {
                        //         arrowLeft: <button><Icon>
                        //             <img alt="menu" src="/menu.svg" />
                        //         </Icon></button>,
                        //         arrowLeftDisabled: <button><Icon>
                        //             <img alt="menu" src="/menu.svg" />
                        //         </Icon></button>,
                        //         arrowRight: <button><Icon>
                        //             <img alt="menu" src="/menu.svg" />
                        //         </Icon></button>,
                        //         arrowRightDisabled: <button><Icon>
                        //             <img alt="menu" src="/menu.svg" />
                        //         </Icon></button>,
                        //         addArrowClickHandler: true,
                        //     }
                        // },
                        {
                            resolve: autoplayPlugin,
                            options: {
                                interval: 2000,
                            }
                        },
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 1
                            }
                        },
                    ]}
                    animationSpeed={500}
                >

                    {cats.map(cat => (

                        // <div key={cat.id}>
                        //     <img src={cat.url} />
                        // </div>
                        <CardItem key={cat.id} cat={cat} thumbnail={false} />
                    ))}

                </Carousel>
                <Dots
                    className="d-none d-sm-flex"
                    value={value}
                    onChange={onChange}
                    thumbnails={
                        cats.map(cat => (
                            <CardItem key={cat.id} cat={cat} thumbnail={true} />
                        ))}
                />
            </div>
        )
    }
}

export default Cards
