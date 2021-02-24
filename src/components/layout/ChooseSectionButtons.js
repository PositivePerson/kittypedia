import React, { Fragment, useContext } from 'react'

import Button from '@material-ui/core/Button';

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';

const ChooseSectionButtons = () => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, searchCats } = tumblrCatsContext;

    const firePhotoSection = () => {
        searchCats("photo");
        console.log(cats.length);
    }

    const fireGifSection = () => {
        searchCats("gif");
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
                <div>
                    <Button variant="contained" color="primary" className="mx-5 startBtnSize" onClick={firePhotoSection}>kitten photos</Button>
                    <Button variant="contained" color="primary" className="mx-5 startBtnSize" onClick={fireGifSection}>kitten gifs</Button>
                </div>
            </header>
        )
    }

}

export default ChooseSectionButtons