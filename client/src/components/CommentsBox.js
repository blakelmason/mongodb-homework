//react
import React, { Component } from 'react';

//icons
import { FaArrowCircleDown } from 'react-icons/fa';

//components
class CommentsBox extends Component {
  state = {
    comments: null
  }

  hello() {
    console.log('hello');
  }

  render() {
    return (
      <div>
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-auto">
            <button onClick={this.hello.bind(this)} style={{ border: 'none', background: 'none', outline: 'none' }} className="pl-0">
              <h6 className="d-flex align-items-center mb-0">
                Comments (0)<FaArrowCircleDown className="ml-2" />
              </h6>
            </button>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary btn-sm">Comment</button>
          </div>
        </div>
        <div className="row border rounded mt-3 mx-0">
          <div className="col">
            Comments
          </div>
        </div>
      </div>
    )
  }
}

export default CommentsBox;