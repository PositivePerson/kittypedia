import { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Button from '@material-ui/core/Button';

import PrivacyPolicy from './components/pages/policy';
import TermsOfUse from './components/pages/terms';

import TumblrCatsState from './context/tumblrCats/tumblrCatsState';

function App() {
  return (
    <TumblrCatsState>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <header className="App-header">
                    <Button variant="contained" color="primary">Go to cats photos</Button>
                  </header>
                </Fragment>
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
