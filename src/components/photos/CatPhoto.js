import React, { Fragment, useContext } from 'react'

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';
import cardItem from './cardItem';

const CatPhoto = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats } = tumblrCatsContext;

    if (cats) {
        console.log("Cats spotted");

        return (
            <Fragment>
                { cats.map(cat => (
                    <cardItem key={cat.id} cat={cat} />
                ))}
            </Fragment>
        )
    } else {
        console.log("There is no cat!");
    }
}

export default CatPhoto
