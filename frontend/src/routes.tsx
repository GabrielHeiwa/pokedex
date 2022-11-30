import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function WebRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/pokedex'
					element={<App />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export { WebRoutes as Routes };
