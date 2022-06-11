import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';
import Event from './pages/Event';
import Analytics from './pages/Analytics';
import CreateEvent from './pages/CreateEvent';
import RSVPS from './pages/RSVPS';
import Pages from './pages/Pages';
import Speakers from './pages/Speakers';
import Sponsors from './pages/Sponsors';
import Template from './pages/Template';
import Teams from './pages/Teams';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Event} />
          <Route exact path='/analytics' component={Analytics} />
          <Route exact path='/create-event' component={CreateEvent} />
          <Route exact path='/manage-rsvps' component={RSVPS} />
          <Route exact path='/pages' component={Pages} />
          <Route exact path='/speakers' component={Speakers} />
          <Route exact path='/sponsors' component={Sponsors} />
          <Route exact path='/teams' component={Teams} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/error' component={Error} />
          <Route exact path='/*' component={Template} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
