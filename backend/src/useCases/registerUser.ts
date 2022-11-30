import { prisma } from "../database/connection";
import type { Request, Response } from "express";
import { hashPassword } from "../utils/hash";

async function registerUser(req: Request, res: Response) {
	try {
		const { trainer_name, password } = req.body;

		const trainerNameAlreadyExist = await prisma.trainer.findUnique({
			where: { trainer_name },
		});

		if (trainerNameAlreadyExist)
			throw new Error("Nome de treinador já está em uso");

		const trainer = await prisma.trainer.create({
			data: {
				trainer_name,
				password: await hashPassword(password),
			},
		});

		return res.status(201).json({
			message: "Treinador criado com sucesso",
			trainerId: trainer.id,
		});
	} catch (error: any) {
		const errorMessage = error.message;
		return res.status(400).json({
			message: errorMessage,
		});
	}
}

export { registerUser };
