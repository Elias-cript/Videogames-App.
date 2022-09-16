import React from "react";
import Games from "./Games";
import { useEffect, useState } from "react";
import {
    getGames,
    getGenres,
    filterByGenre,
    filterBy,
    sort,
} from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import Nav from "./Nav";
import styles from './Home.module.css'
import Paged from "./paged";
import Loader from "./Loader";


export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame);
    const [order, setOrder] = useState('');

    const paged = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    }, [dispatch])

    function handleFilterByGenre(e) {
        dispatch(filterByGenre(e.target.value))
    }

    function handleFilterByExistingOrCreate(e) {
        dispatch(filterBy(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(sort(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    console.log(currentGames)

    return (
        <div className={styles.home}>

            <Nav />



            <div className={styles.aux}>
                <select className={styles.aux2} onChange={(e) => handleFilterByGenre(e)}>
                    <option selected disabled>Genres:</option>
                    {genres ? genres.map(g => {
                        return (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        )
                    }) : (
                        <h2>No genres</h2>
                    )}
                </select>

                <select className={styles.aux2} onChange={(e) => handleFilterByExistingOrCreate(e)}>
                    <option selected disabled>Games:</option>
                    <option value="All">All</option>
                    <option value="Existing">Existing</option>
                    <option value="Created">Created</option>
                </select>

                <select className={styles.aux2} onChange={(e) => handleSort(e)}>
                    <option selected disabled>Order:</option>
                    <option value="asc by name">ABC ↑</option>
                    <option value="desc by name">ABC ↓</option>
                    <option value="asc by rat">Rating ↑</option>
                    <option value="desc by rat">Rating ↓</option>
                </select>

            </div>



                <Route

                    exact path='/home'
                    render={() => <Games videogames={currentGames} />}

                />
            

            <Route
                exact path='/home'
                render={() => <Paged
                    videogames={videogames.length}
                    gamesPerPage={gamesPerPage}
                    paged={paged}
                />}
            />
        </div>
    )
}
