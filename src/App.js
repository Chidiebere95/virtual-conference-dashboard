import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Submenu from "./components/Submenu";
import Sidebar from "./components/Sidebar";
import Event from "./pages/Event";
import Analytics from "./pages/Analytics";
import CreateEvent from "./pages/CreateEvent";
import CreateTicket from "./pages/CreateTicket";
import CreateBlog from "./pages/CreateBlog";
import CreateSpeakers from "./pages/CreateSpeakers";
import CreateSponsors from "./pages/CreateSponsors";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Submenu />
          <div className="mt-20 relative flex">
            <Sidebar />
        <Switch>
            <Route exact path="/" component={Event} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/create-ticket" component={CreateTicket} />
            <Route exact path="/create-blog" component={CreateBlog} />
            <Route exact path="/create-speakers" component={CreateSpeakers} />
            <Route exact path="/create-sponsors" component={CreateSponsors} />
        </Switch>
          </div>
      </Router>
    </div>
    
  );
}

export default App;
