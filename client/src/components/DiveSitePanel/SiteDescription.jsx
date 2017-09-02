import React from 'react';

const SiteDescription = props => (
  <div className="col-md-12 weather-section panel-text">
    <h3 className="about">About {props.description.name}</h3>
    <p>{props.description.description}</p>
  </div>
);

SiteDescription.propTypes = {
  description: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SiteDescription.defaultProps = {
  description: {},
};

export default SiteDescription;
