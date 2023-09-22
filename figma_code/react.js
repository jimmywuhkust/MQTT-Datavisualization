var water_consum = 0; // in ml

// Function to get the current date in the user's local timezone with format: 23th September 2023
function get_date() {
  var now = new Date();
  var options = { day: 'numeric', month: 'long', year: 'numeric' };
  return now.toLocaleDateString('en-GB', options);
}

// Function to get the current time in the user's local timezone with format: 06 : 23 PM with pad zero
function get_time() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (12:00 AM)
  
  return padZero(hours) + " : " + padZero(minutes) + " " + ampm;
}

// Helper function to pad zero for hours and minutes
function padZero(num) {
  return (num < 10 ? "0" : "") + num;
}

function flow_update(data){
  date = date * 1000;
  water_consum = water_consum + data/60;
  console.log('total water consumtion: ' + water_consum);
}

// get the current date in Hong Kong Time Zone
function get_bottle() {
  var num_bottle;
  num_bottle = water_consum / 500;
  num_bottle = num_bottle.toFixed(1);
  console.log('update num of bottle:' + num_bottle);
  return num_bottle;
}