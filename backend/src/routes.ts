import { Router } from "express";
import { loginUser } from "./useCases/loginUser";
import { registerUser } from "./useCases/registerUser";

const router = Router();

router.get("/", (req, res) => res.send("Hello world"));


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/favorite", (req, res) => res.send("ok"));
router.post("/disfavorite", (req, res) => res.send("ok"));


export { router };