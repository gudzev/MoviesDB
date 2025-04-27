import { options } from "../api/api.js";

export class Movie
{
    movieId;
    movieTitle;
    movieRating;
    moviePosterPath;
    movieLanguage;
    moviePopularity;
    movieDescription;

    constructor(movieData)
    {
        this.movieId = movieData.movieId;
        this.movieTitle = movieData.movieTitle;
        this.movieRating = movieData.movieRating.toFixed(2);
        this.moviePosterPath = movieData.moviePosterPath;
        this.movieLanguage = movieData.movieLanguage;
        this.moviePopularity = movieData.moviePopularity;
        this.movieDescription = movieData.movieDescription;
    }
}

export class MovieFetcher
{
    async getPopularTop20()
    {
        try
        {
            const request = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
            let data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    async getMovie(movieName)
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    async getBestTop20()
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }
}