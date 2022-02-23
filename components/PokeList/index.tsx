import Link from "next/link";
import { useState } from "react";
import useSwr from "swr";
import styles from "../../styles/PokeList.module.css";

export type NamedEntry = {
    name: string;
    url: string;
}

export type PokemonList = {
    count: number;
    next?: string;
    previous?: string;
    results: NamedEntry[];
}

const fetchPokemonList = (url: string) => fetch(url).then(res => res.json());

const PokeList: React.FC = () => {

    const size = 20;
    const url = "https://pokeapi.co/api/v2/pokemon";

    const [page, setPage] = useState(1);

    const { data, error } = useSwr<PokemonList, Error>(`${url}?limit=${size}&offset=${(page - 1) * size}`, fetchPokemonList);

    function previousPage(event: React.MouseEvent<HTMLButtonElement>) {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage(event: React.MouseEvent<HTMLButtonElement>) {
        if (data && page < (data.count / size)) {
            setPage(page + 1);
        }
    }

    if (error) return <div>Error Loading Pokemon List</div>;

    return (
        <div className={styles.card}>
            <div className={styles.total}>Total Pokemons: {data?.count ?? "0"}</div>
            <div className={styles.page}>Page: {page}</div>
            <div className={styles.button_container}>
                <div>
                    <button
                        className={styles.navigation_button + " " + styles.button_previous}
                        onClick={previousPage}
                        disabled={!data?.previous ?? false}>
                        Anterior
                    </button>
                    <button
                        className={styles.navigation_button + " " + styles.button_next}
                        onClick={nextPage}
                        disabled={!data?.next ?? false}>
                        Seguinte
                    </button>
                </div>
            </div>
            <div className={styles.list_container}>
                {data?.results.map((item, index) => (
                    <div
                        key={index}
                        className={styles.list_item}>
                        <Link href={"/pokemon/" + item.name}>
                            <a>{item.name}</a>
                        </Link>
                    </div>
                ))
                    ?? (
                        <div>Loading...</div>
                    )}
            </div>
        </div>
    );
}

export default PokeList;