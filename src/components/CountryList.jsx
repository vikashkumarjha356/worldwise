import CountryItem from "./CountryItem"
import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CountryList.module.css"
import { useCities } from "../contexts/CitiesContext"
function CountryList() {
    const {cities, isLoading} = useCities()
    if (isLoading)
        return <Spinner />

    if (!cities.length) {
        return <Message message="Get your first city by clicking on the map" />
    }

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else
            return arr
    }, []);
    return (<ul className={styles.countryList}>
        {countries.map((country,index) => <CountryItem country={country} key={index} />)}
    </ul>)
}

export default CountryList