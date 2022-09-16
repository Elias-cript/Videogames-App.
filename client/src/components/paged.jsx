import React from "react";
import styles from './paged.module.css'

export default function Paged({ gamesPerPage, videogames, paged }) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(videogames / gamesPerPage)-1; i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav className={styles.paged}>
            {pageNumbers && pageNumbers.map(n => {
                return (
                    <h4 key={n} className={styles.hov  && styles.h4 } onClick={() => paged(n)}>{n}</h4>
                )
            })}
        </nav>
    )

}