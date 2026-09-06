import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();

                if (response.success) {
                    setUser(response.data);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                authLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);