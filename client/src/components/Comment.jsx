import React from 'react';

var Comment = (props) => {
  console.log('tfdkfd' ,props)
 return(
	<div className="media">
	  <div className="media-left media-middle">
	      <img width="64" className="media-object" src="octo.jpg" alt="..." />
	  </div>
	  <div className="media-body">
	    <h4 className="media-heading">By {props.comments.user_id}</h4>
		      <p>{props.comments.date_1}</p>
					{props.comments.message}
	  </div>
	</div>

  )
};

export default Comment;