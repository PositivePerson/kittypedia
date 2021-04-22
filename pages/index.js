import React, { useContext } from 'react';
import Link from 'next/link';

import TumblrCatsContext from '../context/tumblrCats/tumblrCatsContext';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Drawing = styled.object`
    position: absolute;
    left: 60%;
    top: 50%;
    // transform: translate(-50%, -50%);
    width: 65%;

    // animation-iteration-count: 2;
    animation: yourAnimation 3.8s ease-in-out 0s infinite normal none;

    @media (min-width: 912px) {
      max-width: 23em; 
      }

    @keyframes yourAnimation {
      0%   {transform: translate(-50%,-50%);}
      40%  {transform: translate(-50%, calc(-50% - 7px));}
      100% {transform: translate(-50%, -50%);}
    }

  `;

const Btn = styled(Button)`
  && {
    color: white;
    font-size: .65em;
    background: #AF9C8F;
    outline: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;

    min-width: 9em;
    height: 2.8em;
  }
`;

const Logo = styled.h1`
  font-size: 3em !important;
`;

const Description = styled.h4`
  max-width: 15em;

  fontSize: 1.5em !important;
  margin-top: 1.3em;
  margin-bottom: 2.5em;
  margin-right: 2em;
`;

function Home() {

  const tumblrCatsContext = useContext(TumblrCatsContext);

  const { loading, searchCats } = tumblrCatsContext;

  const firePhotoSection = () => {
    searchCats("photo");
  }

  const fireGifSection = () => {
    searchCats("gif");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div>
        <div className="row align-items-center m-0" style={{ height: "100vh" }}>
          <div className="col-7">
            {/* <Drawing src="/friends_animated.svg" alt="" /> */}
            <Drawing type="image/svg+xml" data="/friends_animated.svg">svg-animation</Drawing>
            {/* <Image
            src="/friends_animated.svg"
            alt="Introduce Illustration"
            width={786, 29}
            height={749, 20}
          /> */}
          </div>
          <div className="col-5">
            <Logo>Caturday</Logo>
            <Description>Jump into ocean of fluffiness and access hundreds of gifs and photos to dowload by one click.</Description>
            <div>
              <Link href="/main_updated">
                <Btn className="" variant="contained" size="small" onClick={firePhotoSection}>PHOTOS</Btn>
              </Link>
              <Link href="/main_updated">
                <Btn className="ml-4 " variant="contained" size="small" onClick={fireGifSection}>GIFS</Btn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home
