import { createContext } from "react";

type AuthContextType = {
    isAuthenticated: () => boolean;

};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {

    // Functions
    function isAuthenticated() {
        return true;
    }

	return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
