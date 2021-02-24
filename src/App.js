import { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivacyPolicy from './components/pages/policy';
import TermsOfUse from './components/pages/terms';
import CatPhoto from './components/photos/CatPhoto';
import ChooseSectionButtons from './components/layout/ChooseSectionButtons';

import TumblrCatsState from './context/tumblrCats/tumblrCatsState';

function App() {

  return (
    <TumblrCatsState>
      <BrowserRouter>
        <div className="App">
          <ChooseSectionButtons />
          <CatPhoto />
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
