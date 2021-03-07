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
                <div className={`container-flex flex-column justify-content-center px-4 ${cardsDisplayFormat ? "" : "card-columns mt-5"}`}>
                    {cats.map(cat => (
                        <div className={cardsDisplayFormat ? "w-50 mx-auto mt-5" : ""}>
                            <CardItem key={cat.id} cat={cat} />
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default Cards
