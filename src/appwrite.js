import { Client, Databases, ID, Query } from 'appwrite';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {

    // use appwrite SDK to check of the searchterm already exists in the database
    try {
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]
        )
        //   if it exists, update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
            // if it does not exist, create a new document with thw search term and count 1
        }

        else {
            await database.createDocument (DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count:1,
                movie_id: movie.id,
                title: movie.title,
                overview: movie.overview,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                backdrop_url: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
            });
        }
    } catch (error) {
        console.error('Error updating search count:', error);
    }
};

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID, [
                Query.limit(5),
                Query.orderDesc('count')
                
            ])
            
        return result.documents;
    }

    catch (error){
        console.error(error)
    }
}


export const getMovieDetails = async (movieId) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('movie_id', movieId)
        ]);
        
        if (result.documents.length > 0) {
            return result.documents[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};
