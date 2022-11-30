import type { Pokemon } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCatchingPokemon } from "react-icons/md";
import { toast } from "react-toastify";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Form,
	Input,
	InputGroup,
	Modal,
	ModalBody,
	ModalHeader,
	Spinner,
} from "reactstrap";
import { PokemonCard } from "../components/pokemon";
import { useAuth } from "../hooks/auth";
import { pokeApi } from "../services/pokeApi";
import { useSelector, useDispatch } from "react-redux";
import { pokemonSelector } from "../redux/slices/pokemons";

const TOTAL_OF_POKEMONS = 1154;

const WAIT = 500;
const debounceEvent = () => {
	let time: number | undefined = undefined;

	return function (fn: any, wait = 1000) {
		clearTimeout(time);

		time = setTimeout(() => {
			fn();
		}, wait);
	};
};
const debounce = debounceEvent();

let CALLING = false;

const ListItem = (props: any) => {
	const { style, index } = props;

	return (
		<div style={style}>
			<PokemonCard pokemon={props.data[index]} />
		</div>
	);
};

const styles: Record<string, React.CSSProperties> = {
	header: {
		padding: "1rem 2rem 0 1rem",
		height: "20vh",
		width: "100vw",
	},

	main: {
		width: "100vw",
		height: "80vh",
	},

	title: {
		width: "100%",
		// textAlign: "center",
		fontWeight: 700,
		fontSize: "32px",
	},
};

function App() {
	// Contexts
	const { isAuthenticated } = useAuth();

	// States
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [fetchMore, setFetchMore] = useState(false);
	const [searching, setSearching] = useState(false);
	const [search, setSearch] = useState("");
	const [list, setList] = useState<Pokemon[]>([]);
	const [progress, setProgress] = useState(0);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showPokemonTeam, setShowPokemonTeam] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	// Hooks
	const { control, handleSubmit } = useForm();

	// Functions
	async function onSubmit(data: any) {
		setSearching(true);

		try {
			await pokeApi.getPokemonByName(data.search).catch((_) => {
				throw new Error(`Pokemon '${data.search}' não foi encontrado`);
			});

			toast.success(`'${data.search}' encontrado`);
		} catch (error: any | Error) {
			const errMessage = error.message;
			toast.error(errMessage);
		}
		setSearching(false);
	}

	async function getPokemons() {
		CALLING = true;

		const fetchPokemons = await pokeApi.listPokemons(0, 5);
		const _pokemons: Pokemon[] = [];
		let _progress = 0;

		for (let i = 0; i < fetchPokemons.results.length; i++) {
			if (i % 50 === 0 && i !== 0) {
				const slice = _pokemons.slice(
					_pokemons.length - 50,
					_pokemons.length
				);
				setPokemons((currPokemons) => [...currPokemons, ...slice]);
				_progress += 50;
				setProgress(_progress);
			}

			const result = fetchPokemons.results[i];
			const pokemon = await pokeApi.getPokemonByName(result.name);
			_pokemons.push(pokemon);
		}
		const lengthDiff = _pokemons.length - _progress;
		const slice = _pokemons.slice(
			_pokemons.length - lengthDiff,
			_pokemons.length
		);
		setPokemons((currPokemons) => [...currPokemons, ...slice]);
		setProgress((currProgress) => {
			console.log({ old: currProgress, new: currProgress + lengthDiff });

			return currProgress + lengthDiff;
		});

		CALLING = false;
	}

	// UseEffects
	useEffect(() => {
		if (!CALLING) getPokemons();
		isAuthenticated().catch((_) => window.location.replace("/login"));
	}, []);

	useEffect(() => {
		const _list =
			search === ""
				? pokemons
				: pokemons.filter(({ name }) => name.includes(search));

		setList(_list);
	}, [pokemons, search]);

	return (
		<div>
			{showPokemonTeam && (
				<PokemonTeam
					handleCloseModal={() => setShowPokemonTeam(false)}
				/>
			)}

			<header
				style={styles.header}
				className='mx-2'
			>
				<h2 style={styles.title}>Qual pokemon está procurando?</h2>

				<br />

				<Form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name='search'
						render={({ field: { onChange } }) => (
							<InputGroup>
								<Input
									bsSize='lg'
									onChange={(e) => {
										onChange(e);
										debounce(
											() => setSearch(e.target.value),
											WAIT
										);
									}}
								/>
								<Button
									color='primary'
									onClick={() => handleSubmit(onSubmit)}
								>
									{searching ? (
										<Spinner
											size='sm'
											color='light'
										/>
									) : (
										"Pesquisar"
									)}
								</Button>
							</InputGroup>
						)}
					/>
				</Form>
			</header>

			<main style={styles.main}>
				<p className='py-2 text-center'>
					Baixando os pokemons: {progress}/{TOTAL_OF_POKEMONS}
				</p>

				{pokemons.length ? (
					<AutoSizer>
						{({ width, height }) => {
							return (
								<List
									height={height}
									itemCount={list.length}
									itemSize={125}
									width={width}
									itemData={list}
									onScroll={(e) => {
										if (
											e.scrollOffset >
												0.6 * 125 * list.length &&
											!fetchMore
										)
											setFetchMore(true);
									}}
								>
									{ListItem}
								</List>
							);
						}}
					</AutoSizer>
				) : (
					<p className='d-flex justify-content-center my-4 py-4'>
						<Spinner
							size='md'
							color='primary'
						/>
					</p>
				)}

				<div
					style={{
						width: 75,
						height: 75,
						position: "absolute",
						bottom: 10,
						right: 10,
						cursor: "pointer",
					}}
					className='bg-danger rounded-circle d-flex flex-row align-items-center'
				>
					<Dropdown
						isOpen={dropdownOpen}
						toggle={toggle}
						direction='start'
					>
						<DropdownToggle tag={"div"}>
							<MdCatchingPokemon
								size={75}
								color='#fff'
							/>
						</DropdownToggle>

						<DropdownMenu>
							<DropdownItem
								onClick={() =>
									setShowPokemonTeam((curr) => !curr)
								}
							>
								Time pokemon
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</main>
		</div>
	);
}

type PokemonTeamProps = {
	handleCloseModal: () => void;
};

function PokemonTeam({ handleCloseModal }: PokemonTeamProps) {
	// Redux
	const { team } = useSelector(pokemonSelector);

	return (
		<Modal
			isOpen
			size=""
			centered
		>
			<ModalHeader toggle={handleCloseModal}>
				<h2>Time Pokemon</h2>
			</ModalHeader>
			<ModalBody>
				{team.map((pokemon) => (
					<PokemonCard pokemon={pokemon} />
				))}
			</ModalBody>
		</Modal>
	);
}

export default App;
