import { prisma } from "../database/connection";
import type { Request, Response } from "express";

async function favoritePokemon(req: Request, res: Response) {
	try {
		const { trainerId, pokemon } = req.body;

        await prisma.pokemon.upsert({
            create: {
                data: JSON.stringify(pokemon),
                name: pokemon.name,
            },
            update: {},
            where: { name: pokemon.name }
        })

        await prisma.team.create({
            data: {
                trainerId,
                pokemonName: pokemon.name
            }
        })

        return res.status(200).json({
			message: "Pokemon inserido no time com sucesso",
        })
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { favoritePokemon };
