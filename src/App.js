import { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivacyPolicy from './components/pages/policy';
import TermsOfUse from './components/pages/terms';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Fragment>
                <header className="App-header">
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
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
  );
}

export default App;
