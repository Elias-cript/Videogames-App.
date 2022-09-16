import React from 'react';
import styles from './Game.module.css'
import { Link } from 'react-router-dom';

export default function Game({ image, name, genres, id }) {

    return (

        <div className={styles.container}>
            <Link to={`/game/${id}`}>
                <div className={styles.divImage}>

                    <img src={image ? image :
                        'https://media.istockphoto.com/vectors/pixel-art-game-design-in-8-bit-style-character-vector-id1196370362?k=20&m=1196370362&s=612x612&w=0&h=Dwod1UKuBOGfv0UlL0Rr01JS-VR5G8mhpJR9NkQUxq8='}
                        alt='game' className={styles.image} />

                </div>

                <h4 className={styles.title}>{name}</h4>
                <div className={styles.genres}>
                    {genres ? genres.map(g => {
                        return (
                            <h7 className={styles.genre}>{g}</h7>
                        )
                    }) : <h2>No genres</h2>}
                </div>
            </Link>
        </div>

    )
}