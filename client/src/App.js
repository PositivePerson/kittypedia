import { useState, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import styled from 'styled-components';

import PrivacyPolicy from './components/pages/policy';
import TermsOfUse from './components/pages/terms';
import Cards from './components/photos/Cards';
import ChooseSectionButtons from './components/layout/ChooseSectionButtons';

import TumblrCatsState from './context/tumblrCats/tumblrCatsState';
import Button from '@material-ui/core/Button';

function App() {

  const [cardsDisplayFormat, setCardsDisplayFormat] = useState(true);
  const [APIFetched, setAPIFetched] = useState(false);

  // const [response, setResponse] = useState('');
  // const [post, setPost] = useState('');
  // const [responseToPost, setResponseToPost] = useState('');

  // const callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: post }),
  //   });


  //   const body = await response.text();
  //   setResponseToPost(body);
  // }

  // useEffect(() => {
  //   callApi()
  //     .then(res => setResponse(res.express))
  //     .catch(err => console.log(err));
  // }, [])

  const btnFloatBox = {
    position: "absolute",
    right: "1.5em",
    top: "1.5em",
  }

  const btnFloat = {
    position: "fixed",
    display: "flex",
    right: "1.5em",
    top: "1.5em",
    zIndex: "999",

    width: "2em",
    height: "2em",

    fontSize: "1.9em"
  }

  const Emoji = styled.span`
    font-size: .9em;
  `;

  return (
    <TumblrCatsState>
      <BrowserRouter>
        <div className="App">
          <div className="App-container">

            {/* <p>{response}</p>
            <form onSubmit={handleSubmit}>
              <p>
                <strong>Post to Server:</strong>
              </p>
              <input
                type="text"
                value={post}
                onChange={e => setPost(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
            <p>{responseToPost}</p> */}

            {APIFetched &&
              <>
                <Button style={btnFloat} onClick={() => setCardsDisplayFormat(!cardsDisplayFormat)} color="secondary">{cardsDisplayFormat ? <i class="fas fa-th"></i> : <i class="fas fa-align-justify"></i>}</Button>
                <h1>Caturday</h1>
                <h4 className="desc">Provide kitty stuff every day <Emoji>😸</Emoji></h4>
                <Cards cardsDisplayFormat={cardsDisplayFormat} />
              </>
            }
            {!APIFetched &&
              <ChooseSectionButtons setAPIFetched={setAPIFetched} APIFetched={APIFetched} />
            }
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <div></div>
                )}
              />
              <Route
                exact path='/policy'
                component={PrivacyPolicy} />
              <Route
                exact path='/terms'
                component={TermsOfUse} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </TumblrCatsState>
  );
}

export default App;
