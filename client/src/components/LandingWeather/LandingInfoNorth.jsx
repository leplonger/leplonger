import React from 'react';
import NorthWeatherTable from './NorthWeatherTable.jsx';

const LandingInfoNorth = props => (
  <div className="col-md-12 weather-section panel-text">
    <h3>Northern Coast Weather</h3>
    <NorthWeatherTable darksky={props.darksky} />
  </div>
);

LandingInfoNorth.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

LandingInfoNorth.defaultProps = {
  // darksky: [],
};

export default LandingInfoNorth;
