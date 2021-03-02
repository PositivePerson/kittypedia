import { useState, useContext } from 'react'
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

  const btnFloat = {
    position: "absolute",
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
            {APIFetched &&
              <>
                <h1>Caturday</h1>
                <h4 className="desc">Provide kitty stuff every day <Emoji>😸</Emoji></h4>
                <Button style={btnFloat} onClick={() => setCardsDisplayFormat(!cardsDisplayFormat)} color="secondary"><i class="fas fa-th"></i></Button>
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
