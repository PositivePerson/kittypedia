import React, { useContext } from 'react';
import Link from 'next/link';

import TumblrCatsContext from '../context/tumblrCats/tumblrCatsContext';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import { easing } from '@material-ui/core';

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

  font-size: 1.5em !important;
  margin-top: 1.3em;
  margin-bottom: 2.5em;
  margin-right: 2em;
`;

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUpAndDownOut = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .6,
      ease: easing,
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

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
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'>
      <div>
        <motion.div variants={stagger} className="row align-items-center m-0" style={{ height: "100vh" }}>
          <motion.div variants={fadeInUpAndDownOut} className="col-7">
            {/* <Drawing src="/friends_animated.svg" alt="" /> */}
            <Drawing type="image/svg+xml" data="/friends_animated.svg">svg-animation</Drawing>
            {/* <Image
            src="/friends_animated.svg"
            alt="Introduce Illustration"
            width={786, 29}
            height={749, 20}
          /> */}
          </motion.div>
          <motion.div variants={fadeInUpAndDownOut} className="col-5">
            {/* <div > */}
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
            {/* </div> */}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Home
