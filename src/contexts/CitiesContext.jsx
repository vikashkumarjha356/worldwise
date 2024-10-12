import { useState, createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payLoad }
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payLoad }
        case 'city/created':
            return { ...state, isLoading: false, cities: [...state.cities, action.payLoad], currentCity: action.payLoad }
        case 'city/deleted':
            return { ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payLoad), currentCity: {} }
        case 'loading':
            return { ...state, isLoading: true }
        case 'rejected':
            return { ...state, error: action.payLoad, isLoading: false }
        default:
            throw new Error('Unexpected error')

    }
}

function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: 'loading' })
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payLoad: data })
            } catch (err) {
                dispatch({ type: 'rejected', payLoad: "There was an error fetching cities..." })
            }
        }

        fetchCities();
    }, [])

    async function getCity(id) {
        if (Number(id) === currentCity.id) return

        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payLoad: data })
        } catch (err) {
            dispatch({ type: 'rejected', payLoad: "There was an error fetching cities..." })
        }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            const data = await res.json();
            dispatch({ type: 'city/created', payLoad: data })

        } catch (err) {
            dispatch({ type: 'rejected', payLoad: "There was an error fetching cities..." })
        }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' })
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });

            dispatch({ type: 'city/deleted', payLoad: id })
        } catch (err) {
            dispatch({ type: 'rejected', payLoad: "There was an error fetching cities..." })
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