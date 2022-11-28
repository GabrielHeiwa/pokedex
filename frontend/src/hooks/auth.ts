import { useContext } from "react";
import { AuthContext } from "../context/auth";

function useAuth() {
	const { ...props } = useContext(AuthContext);

	return { ...props };
}

export { useAuth };
