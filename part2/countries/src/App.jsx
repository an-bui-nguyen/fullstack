import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Display from './components/Display'
import axios from "axios";

function App() {
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/"
  const [input, setInput] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);


  // fetch list of all countries
  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await axios.get(`${baseURL}all`);
      return response.data;
    }
    (async() => {
      const countries = await fetchCountriesData().catch(console.error);
      setCountryList(countries);
    })().catch(console.error());
  }, [])

  const countryName = countryList.map((country) => {return country.name.common})

  const handleInputChange = (event) => {
    setInput(event.target.value);
    const filterCountry = countryName.filter((country) => {return country.toLowerCase().includes(event.target.value.toLowerCase())});
    setFilteredCountry(filterCountry);
  }

  return (
    <>
      <InputForm input={input} handleInputChange={handleInputChange}/>
      <Display filteredCountry={filteredCountry}/>
    </>
  )
}

export default App
