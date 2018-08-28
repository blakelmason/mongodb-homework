//react
import React, { Component } from 'react';

//axios
import axios from 'axios';

//components
import CommentsArea from './CommentsArea.js';

class Articles extends Component {
  state = {
    articles: null,
  }

  componentDidMount() {
    this.scrape();
  }

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
    if (this.state.articles) {
      const articles = []
      this.state.articles.forEach((elem, i) => {
        articles.push(
          <div key={elem._id} className="border border-dark rounded py-3 px-4 bg-light mx-2 my-4">
            <div className="row ">
              <div className="col ">
                <div><h5 className="mb-2">{elem.title}</h5></div>
                <div className="mb-3"><a href={elem.link} target="_blank">{elem.link}</a></div>
                <div className="text-left"><p className="mb-2" style={{ textIndent: '30px' }}>{elem.summary}</p></div>
              </div>
            </div>
            <hr />
            <CommentsArea article={elem.title} />
          </div>
        )
      })
      return (
        <div className="container px-0">
          {articles}
        </div>
      );
    } else {
      //return nothing if articles do not exists
      return null;
    }
  }
}

export default Articles;