/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
  let row = table.querySelectorAll('.data-table__row');

  if (row !== null) {
    for (let i = 0; i < row.length; i += 1) {
      table.removeChild(row[i]);
    }
  }

  buildTableRow(table, array);
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

  filtered = array.filter((el) => {
    return el['y'] >= filterValue;
  });

  return filtered;
}

filter.addEventListener('reset', () => {
  filteredData = [...data];

  buildTable(filteredData);
});


/***/ })
/******/ ]);