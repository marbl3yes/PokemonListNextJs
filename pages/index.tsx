import type { NextPage } from 'next';
import Head from 'next/head';
import PokeList from '../components/PokeList';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Listing</title>
        <meta name='description' content='List of Pokemons provided by the Poke API' />
      </Head>

      <div className={styles.main}>
        <PokeList></PokeList>
      </div>
    </div>
  )
}

export default Home
