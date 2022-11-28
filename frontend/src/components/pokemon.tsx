import type { Pokemon } from "pokenode-ts";
import { Badge, Col, Row } from "reactstrap";
import { POKEMONS_TYPE_COLORS, POKEMONS_TYPE_COLORS_BACKGROUND } from "../constants/colors";

type PokemonCardProps = {
    pokemon: Pokemon,
}

function PokemonCard(props: PokemonCardProps) {
    const { pokemon } = props;

    return <Row className="mx-4 my-2 rounded shadow-lg" style={{ backgroundColor: POKEMONS_TYPE_COLORS_BACKGROUND[pokemon.types[0].type.name]}}>
        <Col className="mx-3" >
            <p className="m-1" style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18
            }}>{pokemon.name}</p>
            {
                pokemon.types.map(type => {
                    return <span key={type.type.name} style={{ background: POKEMONS_TYPE_COLORS[type.type.name] }} className='m-1 p-2 badge'>
                        {type.type.name}
                    </span>
                })
            }
        </Col>


        <Col className="d-flex justify-content-center">
            <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
        </Col>

        {/* <p>{pokemon.name}</p>
        <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} /> */}
    </Row>
}

export { PokemonCard };
