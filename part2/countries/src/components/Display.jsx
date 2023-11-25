import axios from "axios";
import SingleCountry from "./SingleCountry";
import { useState, useEffect } from "react";


const Display = ({filteredCountry}) => {
    const [currentCountry, setCurrentCountry] = useState("");
    const [countryData, setCountryData] = useState(null);

    const handleClick = (c) => {
        setCurrentCountry(c.country.toLowerCase())
    }

    useEffect(() => {
        if (filteredCountry.length === 1) {
            setCurrentCountry(filteredCountry[0])
        } 
    }, [filteredCountry])

    useEffect(() => {
        const fetchCountryData = async (location) => {
            try {
                const data = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/" + location);
                return data;
            } catch (error) {
                console.error(error)
            }
        }

        const fetchData = async () => {
            if (currentCountry === "") {
                setCountryData(null);
            } else {
                const data = await fetchCountryData(currentCountry);
                setCountryData(data.data);
            }
        }
        (async () => {
            await fetchData().catch((error) => {console.error(error)});
        })();
    }, [currentCountry])

    const decideDisplay = (filteredCountry) => {
        if (filteredCountry.length > 10) {
            return <p>Too many matches, specify another filter</p>;
        } else if (filteredCountry.length > 1) {
            return (
                <div>
                    {filteredCountry.map((country) => {
                        return (
                            <div key={country}>
                                <p>{country}</p>
                                <button onClick={() => handleClick({country})}>show</button>
                            </div>
                        )}
                    )}
                </div>
            )
        } else {
            return <></>
        }
    }
    return (
        <div>
            {decideDisplay(filteredCountry)}
            {(countryData) ? <SingleCountry data={countryData}/> : <></>}
        </div>
    )
}

export default Display;