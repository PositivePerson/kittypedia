import React, { Fragment, useEffect, useContext } from 'react'

import Button from '@material-ui/core/Button';

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';

const ChooseSectionButtons = ({ APIFetched, setAPIFetched }) => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { cats, loading, searchCats } = tumblrCatsContext;

    const firePhotoSection = () => {
        searchCats("photo");
        console.log(cats.length);
        setAPIFetched(true);
    }

    const fireGifSection = () => {
        searchCats("gif");
        console.log(cats.length);
        setAPIFetched(true);
    }

    // useEffect(() => {
    //     if (cats.length && !loading) setAPIFetched(true);
    // }, [loading])

    console.log(cats.length);

    return (
        <header className="App-header full-screen-height">
            <div>
                <Button variant="contained" color="primary" className="mx-5 startBtnSize" onClick={firePhotoSection}>kitten photos</Button>
                <Button variant="contained" color="primary" className="mx-5 startBtnSize" onClick={fireGifSection}>kitten gifs</Button>
            </div>
        </header>
    )

}

export default ChooseSectionButtons