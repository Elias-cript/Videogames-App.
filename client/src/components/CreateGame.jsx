import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres, getPlatforms } from "../redux/actions";
import styles from './CreateGame.module.css';
import Nav from "./Nav";

function validate(input) {
    let errors = {};

    if (input.name.length === 0) {
        errors.name = 'Name is required!';
    }

    else if (input.name.length > 100) {
        errors.name = 'Enter a shorter name!'
    }

    else if (!input.description) {
        errors.description = 'Description is required!';
    }

    else if (input.rating < 0 || input.rating > 5) {
        errors.rating = 'Rating range is 0 - 5!'
    }

    else if (!input.rating.match(/^[0-9]+$/)) {
        errors.rating = 'Only numbers'
    }

    else if (!input.launchDate) {
        errors.launchDate = 'When was it launched?'
    }

    else if (input.genre.length == 0) {
        errors.genre = 'At least one genre'
    }

    else if (input.platforms.length == 0) {
        errors.genre = 'At least one platform'
    }

    return errors;
}


export default function CreateGame() {

    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    const [errors, setErrors] = useState({})
    const [payload, setPayload] = useState({
        name: '',
        description: '',
        launchDate: '',
        rating: '',
        platforms: [],
        image: '',
        genre: [],
    })

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
        if (validate(payload)) {
            setErrors(validate(payload))
        }
    }, [dispatch])

    function handleChange(e) {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...payload,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        //just another onChange by the way..

        if (payload[e.target.name].includes(e.target.value)) return

        setPayload({
            ...payload,
            [e.target.name]: [...payload[e.target.name], e.target.value]

        })
        setErrors(validate({
            ...payload,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createGame(payload))
        alert('Videogame created!')
        setPayload({
            name: '',
            description: '',
            launchDate: '',
            rating: '',
            platforms: [],
            image: '',
            genre: [],
        })
        history.push('/home')
    }

    function handleDeletePlatform(e, p) {
        e.preventDefault()
        setPayload({
            ...payload,
            platforms: payload.platforms.filter(e => e !== p)
        })
    }

    function handleDeleteGenre(e, g) {
        e.preventDefault()
        setPayload({
            ...payload,
            genre: payload.genre.filter(e => e !== g)
        })
    }


    return (


        <div className={styles.container}>

            <Nav />
            <div className={styles.container2}>
                <h1 className={styles.h1}>Create videogame</h1>
                <form className={styles.form}>
                    <div className={styles.data}>
                        <div>
                            <label htmlFor="" className={styles.text}>Name:</label>
                            <br />
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                value={payload.name}
                                onChange={e => handleChange(e)}
                            />
                            {errors.name && (
                                <p className={styles.error}>{errors.name}</p>
                            )}


                        </div>

                        <div className={styles.data}>
                            <label htmlFor="" className={styles.text}>Description:</label>
                            <br />
                            <input
                                className={styles.input}
                                type="text"
                                name="description"
                                value={payload.description}
                                onChange={e => handleChange(e)}
                            />
                            {errors.description && (
                                <p className={styles.error}>{errors.description}</p>
                            )}
                        </div>

                        <div className={styles.data}>
                            <label htmlFor="" className={styles.text}>Launch date:</label>
                            <br />
                            <input
                                className={styles.input}
                                type="date"
                                name="launchDate"
                                value={payload.launchDate}
                                onChange={e => handleChange(e)}
                            />
                            {errors.launchDate && (
                                <p className={styles.error}>{errors.launchDate}</p>
                            )}
                        </div>

                        <div className={styles.data}>
                            <label htmlFor="" className={styles.text}>Rating:</label>
                            <br />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder='1 - 5 inclusive range'
                                name="rating"
                                value={payload.rating}
                                onChange={e => handleChange(e)}
                            />
                            {errors.rating && (
                                <p className={styles.error}>{errors.rating}</p>
                            )}
                        </div>

                        <div className={styles.data}>
                            <label htmlFor="" className={styles.text}>Image:</label>
                            <br />
                            <input
                                className={styles.input}
                                type="text"
                                name="image"
                                value={payload.image}
                                placeholder='http://www.videogame.com/image.jpg'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div>

                        <div className={styles.data}>
                            <label className={styles.text}>Genres:</label>
                            <br />
                            <select className={styles.input} name="genre" onChange={e => handleSelect(e)}>
                                {genres ? genres.map(g => {
                                    return (
                                        <option value={g.name} name='platforms'>{g.name}</option>
                                    )
                                }) :
                                    <h2>No genres</h2>
                                }
                            </select>

                            {errors.genre && (
                                <p className={styles.error}>{errors.genre}</p>
                            )}

                        </div>
                        <div className={styles.genresList}>
                            <h4>Genres list</h4>
                            {payload.genre.map(g =>
                                <div className={styles.genres}>
                                    <p className={styles.platgentext}>{g}</p>
                                    <button className={styles.platgenbut} type='text' onClick={(e) => handleDeleteGenre(e, g)}>X</button>
                                </div>
                            )}
                        </div>
                    </div>


                    <div>
                        <div className={styles.data}>
                            <label className={styles.text}>Platforms:</label>
                            <br />
                            <select className={styles.input} name="platforms" onChange={e => handleSelect(e)}>
                                {platforms ? platforms.map(p => {
                                    return (
                                        <option value={p} name='platforms'>{p}</option>
                                    )

                                }) :
                                    <h2>No platforms</h2>
                                }
                            </select>
                            {errors.platforms && (
                                <p className={styles.error}>{errors.platforms}</p>
                            )}
                        </div>

                        <div className={styles.platformsList}>
                            <h4>Platforms list</h4>
                            {payload.platforms.map(p =>
                                <div className={styles.platforms}>
                                    <p className={styles.platgentext}>{p}</p>
                                    <button className={styles.platgenbut} name='platforms' value={p} onClick={(e) => handleDeletePlatform(e, p)}>X</button>
                                </div>
                            )}
                        </div>
                    </div>



                    {errors.name || errors.description || errors.rating || errors.launchDate || errors.platforms
                        || errors.genre
                        ?
                        <button className={styles.button} disabled type="submit" onClick={e => handleSubmit(e)}>Blocked</button> :
                        <button className={styles.button2} type="submit" onClick={e => handleSubmit(e)}>Create now</button>
                    }



                </form>
            </div>
        </div>

    )
}