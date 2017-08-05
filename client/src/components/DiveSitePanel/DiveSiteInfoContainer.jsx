import React from 'react';
import SurfaceWeather from './SurfaceWeather.jsx';
import OceanWeather from './OceanWeather.jsx';
import SiteDescription from './SiteDescription.jsx';

const DiveSiteInfoContainer = props => (
  <div className="col-md-3 left-col">
    <div>
      <h2 className="leplonger">Wave Height(m): 12 Hr History</h2>
    </div>
    <OceanWeather
      bouy={props.bouy}
      graphHeight={props.graphHeight + 1}
      data={props.data}
    />
    <SurfaceWeather weatherdata={props.weatherdata} />
    <SiteDescription description={props.description} />
  </div>
);

OceanWeather.propTypes = {
  graphHeight: React.PropTypes.number, // eslint-disable-line react/forbid-prop-types
  // bouy: React.PropTypes.object,
  // weatherdata: React.PropTypes.object,
  // description: React.PropTypes.object,
};

OceanWeather.defaultProps = {
  graphHeight: 0,
  // bouy: {},
  // weatherdata: {},
  // description: {},
};

export default DiveSiteInfoContainer;
