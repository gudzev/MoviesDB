const { options } = require('./api');

async function loadGenres(mediaType)
{
    try
    {
            const genres = (mediaType === "series") ? await fetch("https://api.themoviedb.org/3/genre/tv/list", options) : 
                                                      await fetch("https://api.themoviedb.org/3/genre/movie/list", options);
            const genresData = await genres.json();
            const genresMap = new Map(genresData.genres.map((genre) => [genre.id, genre.name]));
            return genresMap;
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = 
{
    loadGenres
};