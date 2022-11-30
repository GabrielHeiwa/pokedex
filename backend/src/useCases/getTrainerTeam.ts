import { prisma } from "../database/connection";
import type { Request, Response } from "express";

async function getTrainerTeam(req: Request, res: Response) {
	try {
		const { trainerId } = req.body;

		const team = await prisma.team.findMany({
			where: {
				trainerId,
			},
			select: {
				pokemons: true
			}
		});

		return res.status(200).json({
			message: "Time pokemon carregado com sucesso",
			team,
		});
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { getTrainerTeam };
