import React from 'react';
// import { AreaChart } from 'react-easy-chart';
import { Bar as Test } from 'react-chartjs-2';

const OceanWeather = props => (
  <div className="wave-chart col-md-12 weather-section panel-text">
      <Test
        data={props.data}
      />
    <p>Data for this dive site provided by NDBC Bouy: #{props.bouy}</p>
  </div>
);

OceanWeather.propTypes = {
  bouy: React.PropTypes.number,
  data: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

OceanWeather.defaultProps = {
  bouy: 0,
  data: {},
};

/* export default OceanWeather;
        <AreaChart
          axes
          grid
          noAreaGradient
          width={this.state.componentWidth}
          height={this.state.componentWidth / 2}
          areaColors={['#082d8e']}
          yDomainRange={[0, this.props.graphHeight]}
          interpolate={'cardinal'}
          data={this.props.data}
        />



        <Test
        data={props.data}
      />
*/
