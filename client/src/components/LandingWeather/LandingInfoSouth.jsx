import React from 'react';
import SouthernWeatherTable from './SouthernWeatherTable.jsx';

const LandingInfoSouth = props => (
  <div className="col-md-12 weather-section panel-text">
    <h3>Southern Coast Weather</h3>
    <SouthernWeatherTable darksky={props.darksky} />
  </div>
);

LandingInfoSouth.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

LandingInfoSouth.defaultProps = {
  // darksky: [],
};

export default LandingInfoSouth;
