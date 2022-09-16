import React from "react";
import Nav from "./Nav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import styles from './GameDetail.module.css'

export default function GameDetail() {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(async () => {
        await dispatch(getDetail(id))
    }, [dispatch])

    const videogame = useSelector(state => state.videogameDetail)
    console.log(videogame)

    return (
        <div className={styles.container}>
            <Nav className={styles.nav}/>
            {
                videogame ?
                    <div>
                        <h1 className={styles.title}>{videogame?.name}</h1>
                        <div className={styles.allData}>
                            <img src={videogame?.image} className={styles.image} alt="image.." width="500px" height="500px" />

                            <div className={styles.secondContainer}>
                                <p className={styles.description}>{videogame?.description}</p>
                                <div className={styles.data}>
                                    <div>
                                        <h3 className={styles.h3}>Genres:</h3>
                                        {videogame.genre?.map(e => {
                                            return (
                                                <h5 className={styles.h5}>{e}</h5>
                                            )
                                        })}
                                        {videogame.genres?.map(e => {
                                            return (
                                                <h5 className={styles.h5}>{e}</h5>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <h3 className={styles.h3}>Platforms:</h3>
                                        {videogame.platforms?.map(e => {
                                            return (
                                                <h5 className={styles.h5}>{e}</h5>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <h3 className={styles.h3}>Launch date:</h3>
                                        <h5 className={styles.h5}>{videogame?.launchDate}</h5>
                                    </div>
                                    <div>
                                        <h3 className={styles.h3}>Rating:</h3>
                                        <h5 className={styles.h5}>{videogame?.rating}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    : <h2>No videogame</h2>
            }

        </div>
    )
}