//react
import React, { Component } from 'react';

//packages
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

//css
import './App.css';

//components
import Articles from './components/Articles.js'

class App extends Component {
  state = {
    articles: null,
  }
  componentDidMount() {
    this.scrape();
  }
  //axios call to get articles from scrape route
  scrape() {
    axios.get('/scrape')
      .then(res => {
        this.setState({
          articles: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      })
  }
  render() {
    return (
      <Router>
        <div className="App text-center">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="my-3">D&D Beyond Article Scraping</h1>
              </div>
            </div>
          </div>
          <Articles articles={this.state.articles} />
        </div>
      </Router >
    );
  }
}

export default App;
