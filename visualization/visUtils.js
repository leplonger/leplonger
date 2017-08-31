const bouys = require('./bouys.js');


const getClosestBouy = (lat, lng) => {
  let closest;
  let shortestDistance = Infinity;
  const keys = Object.keys(bouys);
  for (let i = 0; i < keys.length; i += 1) {
  // for (let key in bouys) {
    const xdiff = Math.abs(bouys[keys[i]][0] - lat);
    const ydiff = Math.abs(bouys[keys[i]][1] - lng);
    const currentDistance = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));

    if (currentDistance < shortestDistance) {
      shortestDistance = currentDistance;
      closest = keys[i];
    }
  }

  return closest;
};

// providing this field will let others determine which type of data
// they want to show the user, for now we're specifying waveheight(WVHT)
// see comment in models/index.js ocean method for possible fields
const formatBouyData = (data, field) => {
  // let formatted = [];
  let formatted = {
    labels: [],
    datasets: [{
      label: 'test label',
      data: [],
    }],
  };

  const rows = data.split('\n').slice(0, 14).map((row) => {
    return row.split(' ').filter(element => element !== '');
  });

  const colIndex = rows[0].indexOf(field);

  for (let i = rows.length - 1; i > 1; i -= 1) {
    // const position = { x: (rows.length - (i)), y: +rows[i][colIndex] || 0 };
    // formatted.push(position);

    formatted.labels.push(rows.length - i);
    formatted.datasets[0].data.push(+rows[i][colIndex] || 0);
  }
  console.log('\n');
  console.log(formatted);
  return formatted;
};


module.exports.getBouy = getClosestBouy;
module.exports.formatData = formatBouyData;
