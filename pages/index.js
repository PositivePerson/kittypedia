import React, { useContext } from 'react';
import Link from 'next/link';

import TumblrCatsContext from '../context/tumblrCats/tumblrCatsContext';

import useWindowSize from '../components/layout/getDevicesSize';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import { easing } from '@material-ui/core';

const Drawing = styled.object`
    ${({ deviceWidth }) => (deviceWidth > 576) && `
      position: absolute;
      left: 60%;
      top: 50%;
      // transform: translate(-50%, -50%);

      // animation-iteration-count: 2;
      animation: yourAnimation 3.8s ease-in-out 0s infinite normal none;
    `}

    width: 65%;
    ${({ deviceWidth }) => (deviceWidth < 576) && `
      width: 18em;
    ` || (deviceWidth < 756) && `
      width: 14em;
    `}

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
  ${({ deviceWidth }) => (deviceWidth < 756) && `
      font-size: 2.8em !important;
  `}
`;

const Description = styled.h4.attrs({
  className: "d-none d-sm-block"
})`
  max-width: 15em;

  font-size: 1.5em !important;
  margin-top: 1.3em;
  margin-bottom: 2.5em;
  margin-right: 2em;

  ${({ deviceWidth }) => (deviceWidth < 576) && `
      font-size: 1.3em !important;
      margin-bottom: 1.3em;
      margin-right: 1em;
  ` || (deviceWidth < 756) && `
      font-size: 1.3em !important;
      margin-bottom: 2em;
      margin-right: 1em;
  ` ||
    (deviceWidth < 992) && `
      margin-bottom: 2em;
      margin-right: 1em;
  `}
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

  const size = useWindowSize();

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
        <motion.div variants={stagger} className={`row align-items-center ${size.width < 576 && "align-content-center flex-wrap"} m-0 py-5 py-sm-0`} style={{ textAlign: `${size.width < 576 ? "center" : "inherit"}`, height: "100vh" }}>
          <motion.div variants={fadeInUpAndDownOut} className="col-12 col-sm-6 col-md-7">
            {/* <Drawing src="/friends_animated.svg" alt="" /> */}
            <Drawing type="image/svg+xml" data="/friends_animated.svg" deviceWidth={size.width}>svg-animation</Drawing>
            {/* <Image
            src="/friends_animated.svg"
            alt="Introduce Illustration"
            width={786, 29}
            height={749, 20}
          /> */}
          </motion.div>
          <motion.div variants={fadeInUpAndDownOut} className="col-12 col-sm-6 col-md-5">
            {/* <div > */}
            <Logo deviceWidth={size.width}>Caturday</Logo>
            <Description deviceWidth={size.width}>Jump into ocean of fluffiness and access hundreds of gifs and photos to dowload by one click.</Description>
            <div style={{ marginTop: `${size.width < 576 ? "3rem" : 0}` }}>
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
    </motion.div >
  )
}

export default Home
