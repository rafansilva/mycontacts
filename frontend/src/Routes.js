import { Route, Switch } from 'react-router-dom';

import EditContact from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" exact component={NewContact} />
      <Route path="/edit/:id" exact component={EditContact} />
    </Switch>
  );
}
