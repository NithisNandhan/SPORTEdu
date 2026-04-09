import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <h3>Navigation</h3>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;