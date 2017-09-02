import React from 'react';
import TableRow from './TableRow.jsx';

const SouthernWeatherTable = props => (
  <table className="table">
    <tbody>
      <tr>
        {props.darksky[2].daily.data.map((item, index) =>
          <TableRow key={index} darksky={item} />,
        )}
      </tr>
    </tbody>
  </table>
);

SouthernWeatherTable.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

SouthernWeatherTable.defaultProps = {
  // darksky: [],
};

export default SouthernWeatherTable;
