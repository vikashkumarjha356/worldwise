import { createContext, useContext, useReducer } from "react"
const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, isAuthenticated: true, user: action.payLoad }
        case 'logout':
            return { ...state, isAuthenticated: false, user: null }
        default:
            throw new Error("Unknown action ")
    }
}


const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwertyk",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


function AuthProvider({ children }) {

    const [{ isAuthenticated, user }, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payLoad: FAKE_USER })
        }

    }

    function logout() {
        dispatch({ type: 'logout' })
    }
    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside auth provider");
    return context;
}

export { AuthProvider, useAuth }