import { createContext } from "react";
import { api } from "../services/api";
import { getCookie } from "../utils/cookies";

type AuthContextType = {
	isAuthenticated: () => Promise<boolean>;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
	// Functions
	function isAuthenticated() {
		const trainerId = getCookie("@pokedex/trainerId");

        console.log(trainerId)

		return api
			.post("/me", { trainerId })
			.then((_) => true)
			.catch((_) => false);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
