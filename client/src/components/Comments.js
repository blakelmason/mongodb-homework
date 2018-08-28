//react
import React, { Component } from 'react';

//icons
import { FaTrashAlt } from 'react-icons/fa';

//components
class Comments extends Component {
  render() {
    if (this.props.comments === null || this.props.comments.length === 0) {
      return (
        <div className="mt-2">
          No Comments.
        </div>
      )
    } else {
      const comments = [];
      this.props.comments.forEach((elem, i) => {
        comments.push(
          <div className="row my-3 border" key={elem._id}>
            <div className="col text-left p-3 d-flex justify-content-between">
              <div className="mr-3 pr-2 d-flex align-items-center border-right" style={{ minWidth: '0', flexGrow: '1' }}>
                <div style={{ height: 'fit-content', minWidth: '0' }}>
                  {elem.comment}
                </div>
              </div>
              <div>
                <button onClick={() => this.props.deleteComment(elem._id)} className="btn-sm btn-outline-danger" style={{ cursor: 'pointer' }}><FaTrashAlt className="trash-icon" />
                </button>
              </div>
            </div>
          </div>
        )
      });
      return (
        <div className="col">
          {comments}
        </div>
      );
    }
  }
}

export default Comments;