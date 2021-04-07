import React, { Fragment, useEffect, useContext } from 'react'

import Button from '@material-ui/core/Button';
import styles from '../../styles/StarterButtons.module.css'

import TumblrCatsContext from '../../context/tumblrCats/tumblrCatsContext';

const ChooseSectionButtons = ({ APIFetched, setAPIFetched }) => {
    const tumblrCatsContext = useContext(TumblrCatsContext);

    const { loading, searchCats } = tumblrCatsContext;

    const firePhotoSection = () => {
        searchCats("photo");
        setAPIFetched(true);
    }

    const fireGifSection = () => {
        searchCats("gif");
        setAPIFetched(true);
    }

    return (
        <header className={`d-flex ${styles.AppHeader, styles.fullScreenHeight}`}>
            <div className="row justify-content-center align-self-center w-100">
                <Button variant="contained" color="primary" className={`${styles.startBtnSize} mx-5`} onClick={firePhotoSection}>kitten photos</Button>
                <Button variant="contained" color="primary" className={`${styles.startBtnSize} mx-5`} onClick={fireGifSection}>kitten gifs</Button>
            </div >
        </header >
    )

}

export default ChooseSectionButtons