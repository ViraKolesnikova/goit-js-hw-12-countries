export default class CountriesAPI{
  constructor() {
    this._query = ''
  }

  get query(){
    return this._query;
  }

  set query(newQuery){
    return this._query = newQuery;
  }

  fetchCountries() {
  return fetch(`https://restcountries.com/v2/name/${this._query}`)
    .then(response => response.ok ? response.json(): Promise.reject({err: response.status}))
    .then(obj => {
      if (obj.status !== 404) {
       return obj;
      } return err;
    })    
    .catch(error => console.log('Request Failed:', error));
  }
} 

  
  
 
