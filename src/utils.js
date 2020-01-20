
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  
  module.exports = {
  
    convertTemp(temp) {
      return (Math.round(temp * 1.8 + 32) * 10) / 10 + 'F';
    },
    renderDateTime(ISOString) {
      const dateObj = new Date(ISOString);
      let hours =  dateObj.getHours();
      let hrString = hours < 12 ? hours + 'AM' : hours === 12 ? hours + 'PM' : hours = 12 + 'PM'; 
      return days[dateObj.getDay()] + ', ' 
              + months[dateObj.getMonth()] + ' '
              + dateObj.getDate() + ', '
              + dateObj.getFullYear() + ' at '
              + hrString;
    }
  };
  