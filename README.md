**Movix - A Movie Exploration App**

**Description**

Movix is a web application that allows users to explore and discover movies. It utilizes the TMDb API to fetch movie data, including titles, release years, images, and languages of release. 

Key Features:

* **Search Functionality:** Search for movies by title or keyword.
* **Trending Movies:** View a list of trending movies based on user search history. 
* **Appwrite Integration:** 
    * Stores movie posters for trending movies.
    * Manages trending movie data based on user search frequency.
    * Displays the top 5 most frequently searched movies.

**Technologies Used**

* **Frontend:** React, JavaScript, TailwindCSS
* **Backend:** Appwrite (for database and storage)
* **API:** The Movie Database (TMDb) API

**Installation**

1. Clone the repository:
   ```bash
   git clone [<repository_url>](https://github.com/Mangesh636/Movix)
   ```

2. Navigate to the project directory:
   ```bash
   cd Movix
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**

   Create a new file named .env.local in the root of your project and add the following content:
     ```
    VITE_IMDB_API_KEY=

    VITE_APPWRITE_PROJECT_ID=
    VITE_APPWRITE_DATABASE_ID=
    VITE_APPWRITE_COLLECTION_ID=
     ```

5. Start the development server:
   ```bash
   npm start
   ```

