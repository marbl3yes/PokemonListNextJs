import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import PokeDetail from "../../components/PokeDetail";
import styles from '../../styles/Home.module.css';

function getNameFromQuery(name: string | string[]): string {
    if (Array.isArray(name)) {
        return name[0];
    }
    return name;
}

const Pokemon: NextPage = () => {
    const router = useRouter();
    const { name } = router.query;

    if (!name) return <div>No Pokemon name defined</div>

    const pokemonName = getNameFromQuery(name);

    return (
        <div className={styles.container}>
            <Head>
                <title>Pokemon Listing</title>
                <meta name='description' content='List of Pokemons provided by the Poke API' />
            </Head>

            <div className={styles.main}>
                <PokeDetail name={pokemonName}></PokeDetail>
            </div>
        </div>
    )
};

export default Pokemon;