import React from 'react';
import { AreaChart } from 'react-easy-chart';

class OceanWeather extends React.Component {
  constructor(props) {
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    super(props);
    this.state = {
      windowWidth: initialWidth - 100,
      componentWidth: 300,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() { this.setState({ windowWidth: window.innerWidth - 100 }); }


  render() {
    return (
      <div className="wave-chart col-md-12 weather-section panel-text">
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
        <p>Data for this dive site provided by NDBC Bouy: #{this.props.bouy}</p>
      </div>
    );
  }
}

OceanWeather.propTypes = {
  graphHeight: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  bouy: React.PropTypes.number,
  data: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

OceanWeather.defaultProps = {
  graphHeight: {},
  bouy: 0,
  data: {},
};

export default OceanWeather;
