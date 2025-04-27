import { Movie, MovieFetcher } from "../data/movie.js";

displayMovieList('popular');
displayMovieList('best');

async function displayMovieList(listType)
{
    const movieContainer = document.querySelector(`.js-${listType}-top-20`);
    const movieFetcher = new MovieFetcher();

    let promise = (listType === `popular`) ? await movieFetcher.getPopularTop20() : await movieFetcher.getBestTop20();

    console.log(listType);

    let data = promise.results;
    let movieContainerHTML = ``;
    
    data.forEach((entry) =>
    {
        const movieData = 
        {
            movieId: entry.id,
            movieTitle: entry.title,
            movieRating: entry.vote_average,
            moviePosterPath: `https://image.tmdb.org/t/p/original/${entry.poster_path}`,
            moviePopularity: entry.popularity,
            movieDescription: entry.overview,
            movieLanguage: entry.original_language
        }
        const movie = new Movie(movieData);

        movieContainerHTML += `
                <div class="movie">
                    <img src="${movie.moviePosterPath}" class="movie-img" alt="Movie Image">
                    <h2>${movie.movieTitle}</h2>
                    <h2>${movie.movieRating}</h2>
                </div>
        `;
    });

    movieContainer.innerHTML = movieContainerHTML;
}