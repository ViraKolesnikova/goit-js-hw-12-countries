export default
  function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => response.ok ? response.json(): Promise.reject({err: response.status}))
    .then(obj => {
      if (obj.status !== 404) {
       return obj;
      } return err;
    })    
    .catch(error => console.log('Request Failed:', error));
  }

