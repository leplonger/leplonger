import React from 'react';
import Comment from './Comment.jsx'

const CommentContainer = (props) => {

 return (
 	<div>
 	  <h2>Dive Site Reviews</h2>
 	 {props.comments.map((item, idx) => {
 	 	return <Comment key={idx} comments={item} />
 	 })}
  </div>
  )
}


export default CommentContainer;