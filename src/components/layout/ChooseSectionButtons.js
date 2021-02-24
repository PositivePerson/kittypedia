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
            <>
            </>
        )
    } else {
        return (
            <header className="App-header full-screen-height">
                <Button variant="contained" color="primary" onClick={firePhotoSection}>Go to cats photos</Button>
            </header>
        )
    }

}

export default ChooseSectionButtons