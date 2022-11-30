import { prisma } from "../database/connection";
import type { Request, Response } from "express";

async function favoritePokemon(req: Request, res: Response) {
	try {
		const { trainerId, pokemon } = req.body;

		// const pokemonAlreadyExist = await prisma.pokemon.findUnique({
		// 	where: { name: pokemon.name },
		// });

        await prisma.team.create({
            data: {
                trainerId,
                pokemons: {
                    connectOrCreate: {
                        create: { data: JSON.stringify(pokemon), name: pokemon.name },
                        where: { name: pokemon.name }
                    }
                }
            }
        })

        return res.status(200).send("ok")

		// if (pokemonAlreadyExist) {
		// 	await prisma.team.create({
		// 		data: {
        //             trainerId: trainerId,
		// 			pokemons: {
		// 				connect: { name: pokemon.name },
		// 			},
		// 		},
		// 	});
		// } else {
		// 	await prisma.pokemon.create({
		// 		data: {
		// 			name: pokemon.name,
		// 			data: JSON.stringify(pokemon),
		// 		},
		// 	});
		// }
	} catch (error: any) {
		const errorMessage = error.message;
		throw new Error(errorMessage);
	}
}

export { favoritePokemon };
