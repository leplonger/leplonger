import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMessageChange(e) { this.setState({ message: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewComment(this.props.site.id, this.state.message, this.props.user.id);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add new comment here"
          value={this.state.message}
          onChange={this.handleMessageChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

CommentForm.propTypes = {
  addNewComment: React.PropTypes.func,
  site: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

CommentForm.defaultProps = {
  addNewComment: () => {},
  site: {},
  user: {},
};

export default CommentForm;
