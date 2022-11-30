import { prisma } from "../database/connection";
import type { Request, Response } from "express";
import { verifyPassword } from "../utils/hash";

async function loginUser(req: Request, res: Response) {
	try {
		const { trainer_name, password } = req.body;

		const trainer = await prisma.trainer.findUnique({
			where: { trainer_name },
			select: {
				id: true,
				trainer_name: true,
				password: true,
			},
		});

		if (!trainer)
			return res.status(401).json({
				message: "Usuário não autenticado",
			});

		if (await verifyPassword(password, trainer.password)) {
			const { trainer_name, id } = trainer;

			return res.status(200).json({
				message: "Usuário logado com sucesso",
				trainerId: id,
			});
		} else
			return res.status(401).json({
				message: "Usuário não autenticado",
			});
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { loginUser };
