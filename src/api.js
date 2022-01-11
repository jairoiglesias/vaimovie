import axios from 'axios'

// const BASE_MAIN_URL = 'https://movie-database-imdb-alternative.p.rapidapi.com'
const BASE_MAIN_URL = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com'

// const HEADER_PARAMS = {
//     'x-rapidapi-hos': 'movie-database-imdb-alternative.p.rapidapi.com',
//     'x-rapidapi-key': 'c7e31d8035msh57450c0460d5ae4p15ff98jsndd096a451d5c'
// }

const HEADER_PARAMS = {
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
    'x-rapidapi-key': 'c7e31d8035msh57450c0460d5ae4p15ff98jsndd096a451d5c'
}

const mainAPI = axios.create({
  baseURL: BASE_MAIN_URL,
  headers: HEADER_PARAMS
})

export {
  mainAPI,
}