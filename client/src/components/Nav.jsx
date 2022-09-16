import React from 'react'
import SearchBar from './SearchBar'
import styles from './Nav.module.css'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.div}>
                    <Link to={'/home'} className={styles.a}>
                        <h2 className={styles.gamesapp}>GAMES APP!</h2>
                    </Link>
                </div>
                <div className={styles.div}>
                    <Link to='/create' className={styles.a}>
                        <h4 className={styles.text}>Create new videogame</h4>
                    </Link>
                </div>
                <div>
                    <Link to={'/about'}>
                        <h4 className={styles.text}>About me</h4>
                    </Link>
                </div>
                
            </nav>
        </div>
    )
}