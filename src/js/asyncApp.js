import CountriesAPI from './asyncFetchCountries.js';
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
    fetchQuery();
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

async function fetchQuery() {
  try {
    const response = await countriesAPI.fetchCountries();
    clearMarkup();
    const markup = await renderTemplate(response);
    if (markup) {
      return insertMarkup(markup);      
    } return 
  } catch (error) {
    showErrorMessage();      
  }  
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