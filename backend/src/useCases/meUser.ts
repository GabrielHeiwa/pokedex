import { prisma } from "../database/connection";
import type { Request, Response } from "express";

async function meUser(req: Request, res: Response) {
	try {
		const { trainerId } = req.body;

		const trainer = await prisma.trainer.findUnique({
			where: { id: trainerId },
			select: {
				id: true,
			},
		});

		if (!trainer)
			return res.status(401).json({
				message: "trainador não encontrado",
			});

		return res.status(200).json({
			message: "Dados do trainador",
			trainer,
		});
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { meUser };
