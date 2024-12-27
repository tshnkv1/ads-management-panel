import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ProtectedRoute } from './components';
import { AdvertisementFormPage, AdvertisementListPage, ErrorPage, HomePage } from './pages';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={PUBLIC_ROUTES.HOME} exact component={HomePage} />
        <ProtectedRoute exact path={PRIVATE_ROUTES.ADVERTISEMENTS} component={AdvertisementListPage} />
        <ProtectedRoute exact path={PRIVATE_ROUTES.NEW_ADVERTISEMENT} component={AdvertisementFormPage} />
        <ProtectedRoute exact path={PRIVATE_ROUTES.EDIT_ADVERTISEMENT} component={AdvertisementFormPage} />
        <Route exact path={PUBLIC_ROUTES.ERROR} component={ErrorPage} />
        <Redirect to={PUBLIC_ROUTES.HOME} />
      </Switch>
    </Router>
  );
}

export default App;
