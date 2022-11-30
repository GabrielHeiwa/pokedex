import { Router } from "express";
import { desfavoritePokemon } from "./useCases/desfavoritePokemon";
import { favoritePokemon } from "./useCases/favoritePokemon";
import { getTrainerTeam } from "./useCases/getTrainerTeam";
import { loginUser } from "./useCases/loginUser";
import { meUser } from "./useCases/meUser";
import { registerUser } from "./useCases/registerUser";

const router = Router();

router.get("/", (req, res) => res.send("Hello world"));

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/me", meUser);
router.post("/favorite", favoritePokemon);
router.post("/disfavorite", desfavoritePokemon);
router.post("/team", getTrainerTeam);

export { router };
