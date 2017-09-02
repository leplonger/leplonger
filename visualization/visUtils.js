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
  const formatted = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
    }],
  };

  const rows = data.split('\n').slice(0, 14).map((row) => {
    return row.split(' ').filter(element => element !== '');
  });

  const colIndex = rows[0].indexOf(field);
  const currentHour = new Date().getHours();

  for (let i = rows.length - 1; i > 1; i -= 1) {
    const hour = (currentHour + (rows.length - i)) % 24 || 12;
    formatted.labels.push(hour < 12 ? hour : hour % 12 || 12);
    // formatted.labels.push(hour < 12 ? `${hour}:00` : `${hour % 12 || 12}:00`);
    formatted.datasets[0].data.push(+rows[i][colIndex] || 0);
  }

  return formatted;
};


module.exports.getBouy = getClosestBouy;
module.exports.formatData = formatBouyData;
