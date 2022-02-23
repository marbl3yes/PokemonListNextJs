import useSWR from "swr";
import { NamedEntry } from "../PokeList";

type PokemonAbility = {
    ability: NamedEntry;
    is_hidden: boolean;
    slot: number;
}

type GameIndex = {
    game_index: number;
    version: NamedEntry;
}

type VersionDetail = {
    rarity: number;
    version: NamedEntry;
}

type HeldItem = {
    item: NamedEntry;
    version_details: VersionDetail[];
}

type VersionGroupDetail = {
    level_learned_at: number;
    move_learned_method: NamedEntry;
    version_group: NamedEntry;
}

type Move = {
    move: NamedEntry;
    version_group_details: VersionGroupDetail[];
}

type Sprites = {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other?: any;
    versions?: any;
}

type Stat = {
    base_stat: number;
    effort: number;
    stat: NamedEntry;
}

type PokemonType = {
    slot: number;
    type: NamedEntry;
}

type Pokemon = {
    abilities: PokemonAbility[];
    base_experience: number;
    forms: NamedEntry[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_types?: [];
    species: NamedEntry;
    sprites: Sprites;
    stats: Stat[];
    types: PokemonType[];
    weight: number;
}

type PokemonDetailProps = {
    name: string;
}

const fetchPokemonData = (url: string) => fetch(url).then(res => res.json());

const PokeDetail: React.FC<PokemonDetailProps> = ({ name }) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const { data, error } = useSWR<Pokemon, Error>(url, fetchPokemonData);

    if (error) return <div>Error loading pokemon {name} data</div>;

    return (
        <div>
            <p>Name: {data?.name}</p>
            <p>Height: {data?.height}</p>
        </div>
    );
};

export default PokeDetail;