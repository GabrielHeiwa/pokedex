import { prisma } from "../database/connection";
import type { Request, Response } from "express";

async function desfavoritePokemon(req: Request, res: Response) {
	try {
		const { pokemonName, trainerId } = req.body;

		await prisma.team.deleteMany({
			where: {
				pokemonName,
				trainerId,
			}
		})

		return res.status(200).json({
			message: "Pokemon removido do time com sucesso",
		});
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { desfavoritePokemon };
