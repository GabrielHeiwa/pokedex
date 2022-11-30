import { createContext } from "react";
import { api } from "../services/api";
import { getCookie, setCookie } from "../utils/cookies";

type AuthContextType = {
	isAuthenticated: () => Promise<boolean>;
	logout: () => void;
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

	function logout() {
		setCookie("@pokedex/trainerId", "", 0);
		window.location.replace("/login")
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
