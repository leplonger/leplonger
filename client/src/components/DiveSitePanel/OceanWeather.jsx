import React from 'react';
import { Bar as Test } from 'react-chartjs-2';

const OceanWeather = props => (
  <div className="wave-chart col-md-12 weather-section panel-text">
    <Test
      data={props.data}
      options={{
        title: {
          display: true,
          text: 'Wave Height Last 12 Hours',
          fontColor: '#000',
          fontFamily: 'helvetica',
        },
      }}
    />
    <p>Data for this dive site provided by NDBC Bouy: #{props.bouy}</p>
  </div>
);

OceanWeather.propTypes = {
  bouy: React.PropTypes.string,
  data: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

OceanWeather.defaultProps = {
  graphHeight: {},
  bouy: '...loading...',
  data: {},
};

export default OceanWeather;
