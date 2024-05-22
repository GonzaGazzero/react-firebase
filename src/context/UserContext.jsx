import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

// pertenece a config de firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => { //observable
            setUser(user);
        });
        return unsuscribe; // seguridad para que no funcione doble por error.
    }, []);

    if (user === false) return <p>Loading app...</p>;

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
