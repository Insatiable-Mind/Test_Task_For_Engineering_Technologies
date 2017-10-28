const data = [
{lat: 55.751244, lng: 37.618423, x: 2, y: 5},
{lat: 51.592365, lng: 45.960804, x: 3, y: 2},
{lat: 57.161297, lng: 65.525017, x: 1, y: 7},
{lat: 55.164440, lng: 61.436844, x: 5, y: 3},
{lat: 62.035454, lng: 129.675476, x: 1, y: 10},
{lat: 59.410412, lng: 56.791721, x: 7, y: 1},
];


//*** BUILD TABLE ***//
buildTable(data);

function buildTable(array) {
  let table = document.querySelector('.data-table');
  let rows = table.querySelectorAll('.data-table__row');

  if (rows.length !== 0) {
    deleteTableRows(rows, table);
  }

  buildTableRow(table, array);
}

function deleteTableRows(rows, table) {
  rows.forEach((elem) => {
    table.removeChild(elem);
  });
}

function buildTableRow(table, array) {
  array.forEach((elem) => {
    let row = document.createElement('tr');
    row.classList.add('data-table__row');

    for (let key of Object.keys(elem)) {
      createTableCell(row, elem[key]);
    }

    addElement(row, table);
  });
}

function createTableCell(row, data) {
  let cell = document.createElement('td');
  cell.classList.add('data-table__cell');
  cell.textContent = data;

  addElement(cell, row);
}

function addElement(child, parent) {
  parent.appendChild(child);
}


//*** EVENT LISTENERS ***//
const filter = document.querySelector('.filter');
let filteredData = [];

filter.addEventListener('submit', () => {
  const filterValue = Math.floor(filter.querySelector('.filter__input').value);
  filteredData = refreshArray(filterValue, data);

  buildTable(filteredData);
});

function refreshArray(filterValue, array) {
  let filtered = [];

  filtered = array.filter((elem) => {
    return elem['y'] >= filterValue;
  });

  return filtered;
}

filter.addEventListener('reset', () => {
  filteredData = [...data];

  buildTable(filteredData);
});


import './modules/map.js';

showMapMarkers(data);

function showMapMarkers(array) {
  array.forEach((elem) => {
    let lat = elem['lat'];
    let lng = elem['lng'];

    createMapMarker(lat, lng);
  });
}

function createMapMarker(lat, lng) {
  L.marker([lat, lng]).addTo(map);
}


import './modules/graph.js';
