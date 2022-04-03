import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';
import Event from './pages/Event';
import Analytics from './pages/Analytics';
import CreateEvent from './pages/CreateEvent';
import CreateTicket from './pages/CreateTicket';
import Pages from './pages/Pages';
import Speakers from './pages/Speakers';
import Sponsors from './pages/Sponsors';
import Template from './pages/Template';

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
          <Route exact path='/create-ticket' component={CreateTicket} />
          <Route exact path='/pages' component={Pages} />
          <Route exact path='/speakers' component={Speakers} />
          <Route exact path='/sponsors' component={Sponsors} />
          <Route exact path='/*' component={Template} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
