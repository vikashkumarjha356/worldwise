import { useCities } from "../contexts/CitiesContext"
import styles from "./CityItem.module.css"
import { Link } from "react-router-dom"
const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date))



function CityItem({ cityItem }) {
    const { currentCity, deleteCity } = useCities()
    function handleDelete(e) {
        e.preventDefault();
        deleteCity(cityItem.id)

    }
    return (
        <li>
            <Link className={`${styles.cityItem} ${cityItem.id === currentCity.id ? styles[`cityItem--active`] : ''}`} to={`${cityItem.id}?lat=${cityItem.position.lat}&lng=${cityItem.position.lng}`}>
                <span className={styles.emoji}>{cityItem.emoji}</span>
                <h3 className={styles.name}>{cityItem.cityName}</h3>

                <time className={styles.date}>({formatDate(cityItem.date)})</time>
                <button onClick={(e) => handleDelete(e)} className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem