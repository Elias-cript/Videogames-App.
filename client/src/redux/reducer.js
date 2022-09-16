import {
    GET_GAMES,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_BY,
    ORDER,
    GET_GAME_BY_NAME,
    CREATE_GAME,
    GET_PLATFORMS,
    GET_GAME_BY_ID,
} from "./actions";

const initialState = {
    videogames: [],
    aux: [],
    genres: [],
    platforms: [],
    videogameDetail: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES: {
            return {
                ...state,
                videogames: action.payload,
                aux: action.payload,
            }
        }

        case GET_GAME_BY_ID: {
            return {
                ...state,
                videogameDetail: action.payload
            }
        }

        case GET_GENRES: {
            return {
                ...state,
                genres: action.payload
            }
        }

        case GET_PLATFORMS: {
            return {
                ...state,
                platforms: action.payload
            }
        }

        case CREATE_GAME: {
            return {
                ...state,
            }
        }

        case FILTER_BY_GENRE: {
            const allGames = state.aux
            const genreFiltered = allGames.filter(e => {
                if (e.genres) return e.genres.includes(action.payload)
                if (e.genre) return e.genre.includes(action.payload)
            })
            return {
                ...state,
                videogames: genreFiltered
            }
        }

        case FILTER_BY: {
            const allGames = state.aux;
            const existingOrCreated = action.payload === 'Created' ?
                allGames.filter(e => e.createdAt) : allGames.filter(e => !e.createdAt)
            return {
                ...state,
                videogames: action.payload === 'All' ? allGames : existingOrCreated
            }
        }

        case ORDER: {
            let aux = [];
            if (action.payload === 'asc by name') {
                aux = state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            }
            else if (action.payload === 'desc by name') {
                aux = state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            }
            else if (action.payload === 'asc by rat') {
                console.log(state.videogames[0])
                aux = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                })
            }
            else if (action.payload === 'desc by rat') {
                console.log(action.payload)
                aux = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            }

            return {
                ...state,
                videogames: aux,
            }
        }

        case GET_GAME_BY_NAME: {
            return {
                ...state,
                videogames: action.payload
            }
        }

        default:
            return {
                ...state
            }
    }
}
