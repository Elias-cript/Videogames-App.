import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Welcome to Videogames App</h1>
                <Link to='/home'>
                    <button className={styles.button}>ENTER</button>
                </Link>
            </div>
        </div>
    )
}