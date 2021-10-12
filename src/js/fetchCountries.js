export default
  function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(response=>console.log)
  
}

fetchCountries('india')