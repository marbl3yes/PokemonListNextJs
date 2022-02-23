import React from "react";
import { PokemonList } from "../../pages";
import styles from "../../styles/PokeList.module.css";

type PokemonListProps = {
    data: PokemonList | undefined;
    previousHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    nextHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PokeList: React.FC<PokemonListProps> = ({ data, previousHandler, nextHandler }) => {
    return (
        <div className={styles.card}>
            <p className={styles.total}>Total Pokemons: {data ? data.count : "0"}</p>
            <div className={styles.center_container}>
                <div>
                    <button
                        className={styles.navigation_button + " " + styles.button_previous}
                        onClick={previousHandler}
                        value={data ? data.previous : ""}
                        disabled={!data || !data.previous}>
                        Anterior
                    </button>
                    <button
                        className={styles.navigation_button + " " + styles.button_next}
                        onClick={nextHandler}
                        value={data ? data.next : ""}
                        disabled={!data || !data.next}>
                        Seguinte
                    </button>
                </div>
            </div>
            <div className={styles.center_container}>
                {data ? data.results.map((item, index) => (
                    <div
                        key={index}
                        className={styles.list_item}>
                        {item.name}
                    </div>
                )) : ""}
            </div>
        </div>
    );
}

export default PokeList;