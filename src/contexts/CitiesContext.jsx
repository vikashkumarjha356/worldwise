import { useState, createContext, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data);
                setCities(data)
            } catch (err) {
                alert("There was an error fetching cities")
            } finally {
                setLoading(false)
            }
        }

        fetchCities();
    }, [])

    async function getCity(id) {
        try {
            setLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data)
        } catch (err) {
            alert("There was an error fetching cities")
        } finally {
            setLoading(false)
        }
    }

    async function createCity(newCity) {
        try {
            setLoading(true)
            console.log(newCity);
            console.log(JSON.stringify(newCity));
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);
            setCities((cities) => [...cities, data])
            // setCurrentCity(data)
        } catch (err) {
            alert("There was an error creating cities")
        } finally {
            setLoading(false)
        }
    }

    async function deleteCity(id) {
        try {
            setLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });

            setCities((cities) => cities.filter(city => city.id !== id))
        } catch (err) {
            alert("There was an error deleting cities")
        } finally {
            setLoading(false)
        }
    }


    return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
        {children}
    </CitiesContext.Provider>
}



function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("Cities context was used outside the cities provider")
    }
    return context
}

export { CitiesProvider, useCities }