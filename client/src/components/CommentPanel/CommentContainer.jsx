import React from 'react';
import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';

const CommentContainer = props => (
  <div className="comment-container">

    {props.comments.length > 0 ?
      <h2 className="about review-title">Reviews for {props.currentsite.name}</h2>
      : <h2 className="no-comment">
          Sorry, there are no reviews for {props.currentsite.name} yet.
        </h2>}

    {props.comments.map((item, index) =>
      <Comment key={index} comments={item} />,
    )}

    {(props.userPresent)
    ? <CommentForm user={props.user} site={props.currentsite} addNewComment={props.addNewComment}/>
    : null
  }
  </div>
);


CommentContainer.propTypes = {
  comments: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  currentsite: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userPresent: React.PropTypes.bool,
  user: React.PropTypes.string,
  addNewComment: React.PropTypes.func,
};

CommentContainer.defaultProps = {
  comments: [],
  currentsite: {},
  userPresent: false,
  user: '',
  addNewComment: () => {},
};

export default CommentContainer;
