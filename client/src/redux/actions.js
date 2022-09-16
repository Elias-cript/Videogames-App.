import axios from 'axios';

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GAME_BY_ID = "GET_GAME_FOR_ID";
export const GET_GAME_BY_NAME = "GET_GAME_FOR_NAME";
export const CREATE_GAME = "CREATE_GAME";
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY = 'FILTER_BY';
export const ORDER = 'ORDER';

export const getGames = () => {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/videogames')
            .then(response => {
                dispatch({
                    type: GET_GAMES,
                    payload: response.data
                })
            })
    }
}

export const getPlatforms = () => {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/platforms')
            .then(response => {
                dispatch({
                    type: GET_PLATFORMS,
                    payload: response.data
                })
            })
    }
}

export const getGameByName = (name) => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(response => {
                dispatch({
                    type: GET_GAME_BY_NAME,
                    payload: response.data
                })
            })
    }
}

export function createGame(data) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogames', data);
        console.log(response)
        return response;
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/genres')
            .then(response => {
                dispatch({
                    type: GET_GENRES,
                    payload: response.data
                })
            })
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/videogame/${id}`)
            .then(response => {
                dispatch({
                    type: GET_GAME_BY_ID,
                    payload: response.data
                })
            })
    }
}

export const filterByGenre = (payload) => {
    console.log(payload)
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export const filterBy = (payload) => {
    return {
        type: FILTER_BY,
        payload
    }
}

export const sort = (payload) => {
    return {
        type: ORDER,
        payload
    }
}