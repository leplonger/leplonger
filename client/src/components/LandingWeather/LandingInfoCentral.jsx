import React from 'react';
import CentralWeatherTable from './CentralWeatherTable.jsx';

const LandingInfoCentral = props => (
  <div className="col-md-12 weather-section panel-text">
    <h3>Central Coast Weather</h3>
    <CentralWeatherTable darksky={props.darksky} />
  </div>
);

LandingInfoCentral.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

LandingInfoCentral.defaultProps = {
  // darksky: [],
};

export default LandingInfoCentral;
