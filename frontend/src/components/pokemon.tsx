import type { Pokemon } from "pokenode-ts";
import { TbPokeball } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import {
	POKEMONS_TYPE_COLORS,
	POKEMONS_TYPE_COLORS_BACKGROUND,
} from "../constants/colors";
import { pokemonSelector, setTeam } from "../redux/slices/pokemons";
import { api } from "../services/api";
import { getCookie } from "../utils/cookies";

type PokemonCardProps = {
	pokemon: Pokemon;
};

function PokemonCard(props: PokemonCardProps) {
	// Props
	const { pokemon } = props;

	// Redux
	const { team } = useSelector(pokemonSelector);
	const dispatch = useDispatch();

	// Functions
	async function favAndUnfPokemon() {
		try {
			const _team = [...team];
			const pokemonHasTeam = _team.findIndex(
				({ name }) => name === pokemon.name
			);
			if (pokemonHasTeam < 0) {
				await api.post("/favorite", {
					trainerId: getCookie("@pokedex/trainerId"),
					pokemon,
				});
				dispatch(setTeam([..._team, pokemon]));
			} else {
				await api.post("/disfavorite", {
					pokemonName: pokemon.name,
					trainerId: getCookie("@pokedex/trainerId"),
				});

				_team.splice(pokemonHasTeam, 1);
				dispatch(setTeam(_team));
			}
		} catch (error: any) {
			const errorMessage =
				error.message ||
				error.response.data.message ||
				"Houve um erro ao favoritar o pokemon";
			toast.error(errorMessage);
			return;
		}
	}

	const isFav = team.some(({ name }) => name === pokemon.name);

	return (
		<Row
			className='mx-4 my-2 rounded shadow-lg'
			style={{
				backgroundColor:
					POKEMONS_TYPE_COLORS_BACKGROUND[pokemon.types[0].type.name],
			}}
		>
			<Col className='mx-3'>
				<p
					className='m-1'
					style={{
						color: "#fff",
						fontWeight: 600,
						fontSize: 18,
					}}
				>
					{pokemon.name}
				</p>
				{pokemon.types.map((type) => {
					return (
						<span
							key={type.type.name}
							style={{
								background:
									POKEMONS_TYPE_COLORS[type.type.name],
							}}
							className='m-1 p-2 badge'
						>
							{type.type.name}
						</span>
					);
				})}
			</Col>

			<Col className='d-flex justify-content-center'>
				<img
					src={pokemon.sprites.front_default ?? ""}
					alt={pokemon.name}
				/>
			</Col>

			<Col
				xs={1}
				className='px-0 m-2'
			>
				<div
					onClick={favAndUnfPokemon}
					style={{
						backgroundColor:
							POKEMONS_TYPE_COLORS_BACKGROUND[
								pokemon.types[0].type.name
							],
					}}
					className='rounded-circle'
				>
					<TbPokeball
						size={30}
						color={isFav ? "#fff" : "#000"}
					/>
				</div>
			</Col>
		</Row>
	);
}

export { PokemonCard };
