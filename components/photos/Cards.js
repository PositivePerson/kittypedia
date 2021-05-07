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
    // width: 15em;
`;

const Cards = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading } = tumblrCatsContext;

    const [value, setValue] = useState(0);
    const [hint, setHint] = useState(
        localStorage.getItem('hintsShown') || ''
    );
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
        console.log(localStorage.getItem('hintsShown') || '');

        if (hint === '') {
            toast.info(<div>Grab or use keyboard<KeyboardArrowLeftIcon /><KeyboardArrowRightIcon /></div>, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });
            localStorage.setItem('hintsShown', true);
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
