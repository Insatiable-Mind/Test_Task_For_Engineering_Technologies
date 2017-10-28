const data = [
{lat: 55.751244, lng: 37.618423, x: 2, y: 5},
{lat: 51.592365, lng: 45.960804, x: 3, y: 2},
{lat: 57.161297, lng: 65.525017, x: 1, y: 7},
{lat: 55.164440, lng: 61.436844, x: 5, y: 3},
{lat: 62.035454, lng: 129.675476, x: 6, y: 10},
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


//*** MAP ***//
const map = L.map('map', {
  center: [60.9333333, 76.5666667],
  zoom: 2,
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 13,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiaW5zYXRpYWJsZS1taW5kIiwiYSI6ImNqOWIwaWdrNjFjdDIzM24ya21qbGJuMzQifQ.EIK16areNxtGW7AyBTug6A',
}).addTo(map);

let markers = [];

showMapMarkers(data);


function showMapMarkers(dataArray) {
  dataArray.forEach((elem) => {
    const lat = elem['lat'];
    const lng = elem['lng'];

    createMapMarker(lat, lng);
  });
}

function createMapMarker(lat, lng) {
  let marker = L.marker(
    [lat, lng],
    {opacity: .5}
    ).addTo(map);

  markers.push(marker);
}

function showProperMarkers(markersArray, dataArray) {
  markersArray.forEach((marker) => {
    marker.setOpacity(0);
    for (let elem of dataArray) {
      if (isEqual(marker, elem)) {
        marker.setOpacity(.5);
        break;
      }
    }
  });
}

function highlightMarker(markersArray, target) {
  for (let marker of markersArray) {
    if (isEqual(marker, target)) {
      marker.setOpacity(1);
      break;
    }
  }
}

function isEqual(marker, data) {
  let lat = marker.getLatLng()['lat'];
  let lng = marker.getLatLng()['lng'];

  if (data['lat'] === lat && data['lng'] === lng) {
    return true;
  }

  return false;
}


//*** GRAPH ***//
import * as d3 from "d3";

d3.select(".graph")
.selectAll("div")
.data(data)
.enter().append("div")
.classed("graph__bar", true)
.style("height", function(d) { return d['x'] * 5 + "rem"; })
.style("width", function(d) { return 100 / data.length + "%"; })
.text(function(d) { return d['x']; });

let graphBars = document.querySelectorAll('.graph__bar');
showGraphBars(data, graphBars);


//*** EVENT LISTENERS ***//
const filter = document.querySelector('.filter');
let filteredData = [...data];

filter.addEventListener('submit', () => {
  filteredData = [];
  const filterValue = Math.floor(filter.querySelector('.filter__input').value);

  filteredData = refreshArray(filterValue, data);

  buildTable(filteredData);
  showProperMarkers(markers, filteredData);
  showGraphBars(filteredData, graphBars);
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

  markers.forEach((elem) => {
    elem.setOpacity(.5);
  });

  graphBars.forEach((bar) => {
    bar.style.opacity = '1';
    bar.classList.remove('graph__bar_active');
  });
});


function showGraphBars(dataArray, graphBars) {
  graphBars.forEach((bar) => {
    bar.style.opacity = '0';
    bar.classList.remove('graph__bar_active');
    for (let elem of dataArray) {
      if (Number(bar.textContent) === elem['x']) {
        bar.style.opacity = '1';
      }
    }
  });
}

function highlightGraphBar(graphBars, target) {
  for (let bar of graphBars) {
    if (Number(bar.textContent) === target['x']) {
      bar.classList.add('graph__bar_active');
    } else {
      bar.classList.remove('graph__bar_active');
    }
  }
}


let table = document.querySelector('.data-table');

table.addEventListener('click', (event) => {
  let target = event.target;

  showProperMarkers(markers, filteredData);

  while (target !== table) {
    if (target.className === 'data-table__row') {
      target.lat = Number(target.childNodes[0].textContent);
      target.lng = Number(target.childNodes[1].textContent);
      target.x = Number(target.childNodes[2].textContent);

      highlightMarker(markers, target);
      highlightGraphBar(graphBars, target);
      break;
    }

    target = target.parentNode;
  }
});
