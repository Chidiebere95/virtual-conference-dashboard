// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Submenu from "./components/Submenu";
import Event from "./pages/Event";
import Analytics from "./pages/Analytics";
import CreateEvent from "./pages/CreateEvent";
import Blog from "./pages/Blog";
import CreateTicket from "./pages/CreateTicket";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Submenu/>
      <div className="mt-20 relative flex">
        <Sidebar/>
      {/* <Event /> */}
      {/* <Analytics /> */}
      {/* <CreateEvent/> */}
      {/* <CreateTicket/> */}
      <Blog/>
      </div>
    </div>
  );
}

export default App;
