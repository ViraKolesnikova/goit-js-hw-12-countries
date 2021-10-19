import CountriesAPI from './fetchCountries.js';
import countryList from '../templates/countryList.handlebars';
import country from '../templates/country.handlebars';
var debounce = require('lodash.debounce');
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const searchInputRef = document.querySelector('.search-input');
const resultRef = document.querySelector('.search-result');

searchInputRef.addEventListener('input', debounce(onSearch, 1000));

const countriesAPI = new CountriesAPI();

function onSearch(event) {
  countriesAPI._query = event.target.value;
  
  if (countriesAPI._query === '') {
    clearMarkup();
  } else {
    fetchQuery().catch(showErrorMessage);
  }
}

function renderTemplate(promiseResult) {
  if (promiseResult.length === 1) {
    return country(promiseResult);
  } else  if(promiseResult.length > 1 && promiseResult.length < 11) {
    return countryList(promiseResult);
  } else if (promiseResult.length > 11) {
    showInfoMessage();
  } else {
    return
  }
}

function insertMarkup(markup) {
  resultRef.insertAdjacentHTML('afterbegin', markup);
}

function clearMarkup() {
  resultRef.innerHTML = '';
}

function fetchQuery() {
  return countriesAPI.fetchCountries()
    .then(data => {
      clearMarkup();
      return renderTemplate(data);
    })
    .then(markup => {
      if (markup) {
        insertMarkup(markup)
      } return
    })
    
}

function showErrorMessage() {
  error({
    text: 'Nothing was found by your query!',
    type: 'error',
    width: '600px',
    closer: false,
    sticker: false,
    delay: 2000
  })
}

function showInfoMessage() {
  notice({
    text: 'Too many matches found. Please enter more specific query!',
    type: 'notice',
    width: '600px',
    closer: false,
    sticker: false,
    delay: 2000
  })  
}