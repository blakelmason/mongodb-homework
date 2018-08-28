//react
import React, { Component } from 'react';

//icons
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

//axios
import axios from 'axios'

//components
import Comments from './Comments.js'
import CommentsForm from './CommentsForm.js';

class CommentsArea extends Component {
  state = {
    comments: null,
    commentInput: false,
    commentsDisplay: false,
    article: null,
    newComment: ''
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    axios.get('/comments', {
      params: {
        title: this.props.article
      }
    })
      .then(res => {
        this.setState({
          comments: res.data[0].comments.reverse()
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  commentInputToggle() {
    this.setState({
      commentInput: !this.state.commentInput
    })
  }

  commentsToggle() {
    this.setState({
      commentsDisplay: !this.state.commentsDisplay
    })
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({
      newComment: '',
      commentInput: false
    })
    axios.post('/comments', ({
      comment: this.state.newComment,
      article: this.props.article
    }))
      .then(res => {
        console.log(res);
        this.getComments();
      })
      .catch(err => {
        console.error(err);
      })
  }

  inputHandler(event) {
    this.setState({ newComment: event.target.value });
    event.preventDefault();
  }

  deleteComment(key) {
    axios.delete('/comments', {
      data: {
        id: key
      }
    })
      .then(res => {
        console.log(res);
        this.getComments();
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-auto">
            <button onClick={this.commentsToggle.bind(this)} style={{ border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }} className="pl-0">
              <h6 className="d-flex align-items-center mb-0">
                Comments ({this.state.comments ? this.state.comments.length : '0'})
                {this.state.commentsDisplay ? <FaArrowCircleUp className="ml-2" /> : <FaArrowCircleDown className="ml-2" />}
              </h6>
            </button>
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-primary btn-sm" onClick={this.commentInputToggle.bind(this)}>
              Comment
            </button>
          </div>
        </div>
        <div className={`row mt-3 ${this.state.commentInput ? '' : 'd-none'}`}>
          <div className="col">
            <CommentsForm article={this.props.article} newComment={this.state.newComment} submitHandler={this.submitHandler.bind(this)} inputHandler={this.inputHandler.bind(this)} />
          </div>
        </div>
        <div className={`row ${this.state.commentsDisplay ? '' : 'd-none'}`}>
          <div className="col">
            <Comments comments={this.state.comments} deleteComment={this.deleteComment.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}



export default CommentsArea;