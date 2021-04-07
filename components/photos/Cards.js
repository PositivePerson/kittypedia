import React, { Fragment, useContext } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';
import CardItem from './CardItem';

const Cards = ({ cardsDisplayFormat }) => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading } = tumblrCatsContext;

    if (cats.length === 0) {
        return (
            <div className="w-100">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <Fragment>
                <div className={`container-flex flex-column justify-content-center px-4 ${cardsDisplayFormat ? "" : "card-columns mt-5"} ${"width: 2em"}`}>
                    {cats.map(cat => (
                        <div className={cardsDisplayFormat ? "mx-auto mt-5" : ""} style={{ width: cardsDisplayFormat ? "40%" : "auto" }} key={cat.id}>
                            <CardItem key={cat.id} cat={cat} cardsDisplayFormat={cardsDisplayFormat} />
                        </div>
                    ))}
                </div>

            </Fragment >
        )
    }
}

export default Cards
