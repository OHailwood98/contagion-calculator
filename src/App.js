import { Route, Switch } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Navigation from "./components/nav/Navigation";

function App() {
  return (
    <body>
      <Navigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </body>
  );
}

export default App;
