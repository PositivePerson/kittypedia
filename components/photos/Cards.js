import React, { useState, Fragment, useContext } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';
import CardItem from './CardItem';

import Icon from "@material-ui/core/Icon";

import Carousel, { Dots, slidesToShowPlugin, arrowsPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const Cards = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading } = tumblrCatsContext;

    const [value, setValue] = useState(0);

    const onChange = value => {
        setValue(value);
    }

    if (cats.length === 0) {
        return (
            <div className="w-100">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <Fragment>
                <div className={`container-flex flex-column justify-content-center px-4 `} style={{ position: "relative", zIndex: "50" }}>
                    <Carousel
                        value={value}
                        onChange={onChange}
                        plugins={[
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
                        value={value}
                        onChange={onChange}
                        thumbnails={
                            cats.map(cat => (
                                <CardItem key={cat.id} cat={cat} thumbnail={true} />
                            ))}
                    />
                </div>

            </Fragment >
        )
    }
}

export default Cards
