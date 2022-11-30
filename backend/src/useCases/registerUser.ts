import { prisma } from "../database/connection";
import type { Request, Response } from "express";
import { hashPassword } from "../utils/hash";

async function registerUser(req: Request, res: Response) {
	try {
		const { trainer_name, password } = req.body;

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
		throw new Error(errorMessage);
	}
}

export { registerUser };
