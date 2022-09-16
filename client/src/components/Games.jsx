import React from "react";
import Game from "./Game";
import styles from './Games.module.css'
import GameDetail from "./GameDetail";
import { useDispatch } from "react-redux";
import { getGameById } from "../redux/actions";

export default function Games({ videogames }) {

    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            {videogames.length > 0 ? (
                videogames.map(v => {
                    let aux = v.id;
                    return (
                        <div key={v.id}>
                            
                            <Game
                                id={v.id}
                                key={v.id}
                                name={v.name}
                                genres={v.genres || v.genre}
                                image={v.image}
                            />
                        </div>
                    )
                })) : <h2>No games to show</h2>}
        </div>

    )
}