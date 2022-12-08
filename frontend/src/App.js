import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./assets/css/bootstrap.min.css";
import "./assets/css/light-bootstrap-dashboard.css?v=2.0.1";
import "./assets/css/demo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Appointment from "./pages/Appointment";
import AppointmentList from "./pages/AppointmentList";

function App() {
  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.clear();
    setUser({});
  };

  return (
    <div className="wrapper wrapper-full-page">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-absolute">
          <div className="container">
            <div className="navbar-wrapper">
              <Link
                to={{
                  pathname: "http://localhost:3001",
                }}
                target="__blank"
                className="navbar-brand"
              >
                Virtual Immo
              </Link>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-bar burger-lines"></span>
                <span className="navbar-toggler-bar burger-lines"></span>
                <span className="navbar-toggler-bar burger-lines"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbar"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="nc-icon nc-chart-pie-35"></i> Dashboard
                  </Link>
                </li>
                {user.role === "Customer" ? (
                  <li className="nav-item">
                    <Link to="/appointment" className="nav-link">
                      <i className="nc-icon nc-chart-pie-35"></i> Appointments
                    </Link>
                  </li>
                ) : null}
                {user.name ? (
                  <li className="nav-item">
                    <Link to="/appointmentlist" className="nav-link">
                      <i className="nc-icon nc-chart-pie-35"></i> Appointment
                      list
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <i className="nc-icon nc-chart-pie-35"></i> Login
                    </Link>
                  </li>
                )}
                {user.name ? (
                  <li className="nav-item">
                    <a onClick={logout} className="nav-link">
                      <i className="nc-icon nc-chart-pie-35"></i> Logout
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <i className="nc-icon nc-chart-pie-35"></i> Register
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Dashboard user={user} setUser={setUser} />
          </Route>
          <Route exact path="/appointment">
            <Appointment user={user} setUser={setUser} />
          </Route>
          <Route exact path="/appointmentlist">
            <AppointmentList user={user} setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register setUser={setUser} />
          </Route>
        </Switch>
        <footer className="footer">
          <div className="container">
            <nav>
              <ul className="footer-menu">
                <li>
                  <Link
                    to={{
                      pathname: "http://localhost:3001",
                    }}
                    target="__blank"
                    className="navbar-brand"
                  >
                    Home
                  </Link>
                </li>
                <Link to="/" className="navbar-brand">
                  Dashboard
                </Link>
              </ul>
              <p className="copyright text-center">
                <a href="http://www.virtualimmo.com">Virtual Immo</a>, made with
                love for a better web
              </p>
            </nav>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
