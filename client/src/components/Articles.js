//react
import React from 'react';

//components
import CommentsBox from './CommentsBox.js';

const Articles = (props) => {
  //make sure articles axios call is finished
  if (props.articles) {
    const articles = []
    props.articles.forEach((elem, i) => {
      articles.push(
        <div key={i} className="border border-dark rounded py-3 px-4 bg-light m-2">
          <div className="row ">
            <div className="col ">
              <div><h5 className="mb-2">{elem.title}</h5></div>
              <div className="mb-3"><a href={elem.link} target="_blank">{elem.link}</a></div>
              <div className="text-left"><p className="mb-2" style={{ textIndent: '30px' }}>{elem.summary}</p></div>
            </div>
          </div>
          <hr />
          <CommentsBox />
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

export default Articles;