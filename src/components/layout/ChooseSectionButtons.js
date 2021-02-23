import React, { Fragment, useContext } from 'react'

import Button from '@material-ui/core/Button';

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';

const ChooseSectionButtons = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, searchCats } = tumblrCatsContext;

    const firePhotoSection = () => {
        searchCats();
        console.log(cats.length);
    }

    console.log(cats.length);

    if (cats.length) {
        return (
            <Fragment>
                <div>There is some content fetched already!</div>
                <div>Cats: {cats.length}</div>
            </Fragment>
        )
    } else {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={firePhotoSection}>Go to cats photos</Button>
            </div>
        )
    }

}

export default ChooseSectionButtons