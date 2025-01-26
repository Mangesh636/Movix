import { Client, Databases, ID, Query } from "appwrite"

import { COLLECTION_ID, DATABASE_ID, PROJECT_ID } from "../constant"

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchTerm = async (searchTerm, movie) => {
    try {
        // Using appwrite to check if search term exist in database
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchTerm)])

        // If it does update the count
        if (results.documents.length > 0) {
            const doc = results.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        } else {
            // If doesn't then create a nw document with search term and count as 1
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export const getTrendingMovies = async () => {
    try {
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return results.documents
    } catch (error) {
        console.log(error)
    }
}