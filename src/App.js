import { useState, useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivacyPolicy from './components/pages/policy';
import TermsOfUse from './components/pages/terms';
import Cards from './components/photos/Cards';
import ChooseSectionButtons from './components/layout/ChooseSectionButtons';

import TumblrCatsState from './context/tumblrCats/tumblrCatsState';
import Button from '@material-ui/core/Button';

function App() {

  const [cardsDisplayFormat, setCardsDisplayFormat] = useState(true);
  const [APIFetched, setAPIFetched] = useState(false);

  return (
    <TumblrCatsState>
      <BrowserRouter>
        <div className="App">
          {APIFetched && <>
            <Button onClick={() => setCardsDisplayFormat(!cardsDisplayFormat)}>Toggle Format</Button>
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
      </BrowserRouter>
    </TumblrCatsState>
  );
}

export default App;
