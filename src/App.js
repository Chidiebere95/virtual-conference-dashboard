import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Submenu from "./components/Submenu";
import Event from "./pages/Event";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Submenu/>
      {/* <Event /> */}
      <Analytics />
      
    </div>
  );
}

export default App;
