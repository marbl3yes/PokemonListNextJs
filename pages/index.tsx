import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import useSwr from 'swr';
import PokeList from '../components/PokeList';
import styles from '../styles/Home.module.css';

export type PokemonListEntry = {
  name: string;
  url: string;
}

export type PokemonList = {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonListEntry[];
}

const fetchPokemonList = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const { data, error } = useSwr<PokemonList, Error>(url, fetchPokemonList);

  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    setUrl(event.currentTarget.value);
  }

  if (error) return <div>Error Loading Pokemon List</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Listing</title>
        <meta name='description' content='List of Pokemons provided by the Poke API' />
      </Head>

      <div className={styles.main}>
        <PokeList data={data} previousHandler={changePage} nextHandler={changePage}></PokeList>
      </div>
    </div>
  )
}

export default Home
