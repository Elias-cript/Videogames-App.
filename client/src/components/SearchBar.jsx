import React from 'react';
import styles from './SearchBar.module.css'
import { getGameByName } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchBar() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault()
        dispatch(getGameByName(name))
        setName('')
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} type="text" placeholder='Type a game..' value={name} onChange={(e) => handleInputChange(e)}/>
            <button className={styles.button} onClick={(e) => handleClick(e)}>Go !</button>
        </div>
    )
}