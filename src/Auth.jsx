import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("madflash19");
    return <Auth.Provider value={[name, setName]}>{children}</Auth.Provider>;
};