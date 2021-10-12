import fetchCountries from "./fetchCountries.js";
var debounce = require('lodash.debounce');

const searchInputRef = document.querySelector('.search-input');

searchInputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  let searchValue = event.target.value;
  console.log(searchValue);
}