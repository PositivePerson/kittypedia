import React, { Fragment, useContext } from 'react'

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';

const CatPhoto = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats } = tumblrCatsContext;

    if (cats) {
        console.log("Cats spotted");

        return (
            <Fragment>
                { cats.map(cat => (
                    <div>
                        <img src={cat.url} alt="" />
                        {/* <h3>{cat.id}</h3> */}
                    </div>
                ))}
            </Fragment>
        )
    } else {
        console.log("There is no cat!");
    }
}

export default CatPhoto
