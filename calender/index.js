const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let currentDate = new Date();
let date = currentDate.getDate();
let day = currentDate.getDay();
let month = currentDate.toLocaleString('default', { month: 'long' });
let year = currentDate.getFullYear();

const dateElem = document.getElementById('date');
const dayElem = document.getElementById('day');
const monthElem = document.getElementById('month');
const yearElem = document.getElementById('year');

dateElem.innerHTML = (date < 10 ? "0":"") + date;
dayElem.innerHTML = weekday[day];
monthElem.innerHTML = month;
yearElem.innerHTML = year;