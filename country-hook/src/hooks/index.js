import { useEffect, useState } from "react";
import axios from 'axios'

export const useCountry = (countryName) => {
  const [countryData, setCountryData] = useState(null)
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {setCountryData({...response, found: true})})
      .catch(setCountryData({found: false}))
  }, [countryName])

  return countryData
}