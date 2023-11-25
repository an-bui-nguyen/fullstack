import Weather from "./Weather";

const SingleCountry = (props) => {
    const country = props.data;
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <b>
                languages:
            </b>
            <ul>
                {Object.values(country.languages).map((language) => {return <li key={language}>{language}</li>})}
            </ul>
            <img src={country.flags.svg} alt={country.flags.alt} style={{maxHeight: "150px", maxWidth:"200px"}}></img>
            <h3>Weather in {country.capital[0]}</h3>

            <Weather location={country.capital[0]}/>
        </div>
    )
}

export default SingleCountry;