import React from 'react';
import SurfaceWeather from './SurfaceWeather.jsx';
import OceanWeather from './OceanWeather.jsx';
import SiteDescription from './SiteDescription.jsx';

const DiveSiteInfoContainer = props => (
  <div className="col-md-3 left-col">
    <OceanWeather
      bouy={props.bouy}
      data={props.data}
    />
    <SurfaceWeather weatherdata={props.weatherdata} />
    <SiteDescription description={props.description} />
  </div>
);

DiveSiteInfoContainer.propTypes = {
  bouy: React.PropTypes.string,
  data: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  weatherdata: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  description: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

DiveSiteInfoContainer.defaultProps = {
  bouy: '...loading...',
  data: {},
  weatherdata: {},
  description: {},
};

export default DiveSiteInfoContainer;
