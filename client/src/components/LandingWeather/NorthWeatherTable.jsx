import React from 'react';
import TableRow from './TableRow.jsx';

const NorthWeatherTable = props => (
  <table className="table">
    <tbody>
      <tr>
        {props.darksky[0].daily.data.map((item, index) =>
          <TableRow key={index} darksky={item} />,
        )}
      </tr>
    </tbody>
  </table>
);

NorthWeatherTable.propTypes = {
  // darksky: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

NorthWeatherTable.defaultProps = {
  // darksky: [],
};

export default NorthWeatherTable;
