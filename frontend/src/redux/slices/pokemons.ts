import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Pokemon } from "pokenode-ts";

type InitialStateProps = {
	team: Pokemon[];
};

const INITIAL_STATE: InitialStateProps = {
	team: [],
};

const pokemonsSlice = createSlice({
	initialState: INITIAL_STATE,
	name: "pokemonsSlice",
	reducers: {
		setTeam(state, action: PayloadAction<Pokemon[]>) {
			state.team = action.payload;
		},
	},
});

export const { setTeam } = pokemonsSlice.actions;

export const pokemonSelector = (state: RootState) => state.pokemons;

export default pokemonsSlice.reducer;
