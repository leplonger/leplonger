import React from 'react';
import TableRow from './TableRow.jsx';

const CentralWeatherTable = props => (
  <table className="table">
    <tbody>
      <tr>
        {props.darksky[1].daily.data.map((item, index) =>
          <TableRow key={index} darksky={item} />,
        )}
      </tr>
    </tbody>
  </table>
);

CentralWeatherTable.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

CentralWeatherTable.defaultProps = {
  // darksky: [],
};

export default CentralWeatherTable;
