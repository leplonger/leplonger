import React from 'react';

var Comment = (props) => {
  console.log('tfdkfd' ,props)
 return(
  <div>
  <p>{props.comments.message}</p>
  <p>{props.comments.date_1}</p>

  </div>
  )
};

export default Comment;