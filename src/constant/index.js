// Base API url
const API_BASE_URL = "https://api.themoviedb.org/3"

// API KEY
const API_KEY = import.meta.env.VITE_IMDB_API_KEY

// API options 
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

// APPWRITE
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

export {
    API_BASE_URL,
    API_KEY,
    API_OPTIONS,
    COLLECTION_ID,
    DATABASE_ID,
    PROJECT_ID
}