const data = [
  {lat: 55.751244, lng: 37.618423, x: 2, y: 5},
  {lat: 51.592365, lng: 45.960804, x: 3, y: 2},
  {lat: 57.161297, lng: 65.525017, x: 1, y: 7},
  {lat: 55.164440, lng: 61.436844, x: 5, y: 3},
  {lat: 62.035454, lng: 129.675476, x: 1, y: 10},
  {lat: 59.410412, lng: 56.791721, x: 7, y: 1},
];
let filteredData = [];
const filter = document.querySelector('.filter');

filter.addEventListener('submit', () => {
  const filterValue = Math.floor(filter.querySelector('.filter__input').value);
  filteredData = refreshArray(filterValue, data);
});

filter.addEventListener('reset', () => {
  filteredData = [...data];
});

function refreshArray(filterValue, array) {
  let filtered = [];

  filtered = array.filter((el) => {
    return el['y'] >= filterValue;
  });

  return filtered;
}
