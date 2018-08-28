//react
import React, { Component } from 'react';

//react router
import { BrowserRouter as Router } from "react-router-dom";

//css
import './App.css';

//components
import Articles from './components/Articles.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App text-center">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="mt-3 mb-0">D&D Beyond Article Scraping</h1>
              </div>
            </div>
          </div>
          <Articles />
        </div>
      </Router >
    );
  }
}

export default App;
