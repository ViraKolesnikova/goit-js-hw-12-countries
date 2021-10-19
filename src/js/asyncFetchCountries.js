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

  async fetchCountries() {
    try {
      const response = await fetch(`https://restcountries.com/v2/name/${this._query}`);
      const result = response.ok ? await response.json() : await Promise.reject({ err: response.status });
      if (result.status !== 404) {
        return await result;
      } return await error;
    } catch (error) {
      console.log('Request Failed:', error.name);      
    }
  }
} 

  
  
 
