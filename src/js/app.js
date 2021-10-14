import fetchCountries from './fetchCountries.js';
import countryList from '../templates/countryList.handlebars';
import country from '../templates/country.handlebars';
var debounce = require('lodash.debounce');
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const searchInputRef = document.querySelector('.search-input');
const resultRef = document.querySelector('.search-result');

searchInputRef.addEventListener('input', debounce(onSearch, 1000));

function onSearch(event) {
  let searchValue = event.target.value;

  if (searchValue === '') {
    clearMarkup();
  } else {
    fetchCountries(searchValue)
      .then(data => {
        clearMarkup();
        return renderTemplate(data);
      })
      .then(markup => {
        if (markup) {
          insertMarkup(markup)
        } return
      })
      .catch(err => error({
      text: 'Nothing was found by your query!',
      type: 'error',
      width: '600px',
      closer: false,
      sticker: false,
      delay: 2000
    }))
  }
}

function renderTemplate(promiseResult) {
  if (promiseResult.length === 1) {
    return country(promiseResult);
  } else  if(promiseResult.length > 1 && promiseResult.length < 11) {
    return countryList(promiseResult);
  } else if(promiseResult.length > 11){
     error({
      text: 'Too many matches found. Please enter more specific query!',
      type: 'error',
      width: '600px',
      closer: false,
      sticker: false,
      delay: 2000
    });
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
