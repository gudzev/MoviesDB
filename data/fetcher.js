import { options } from "../api/api.js";

export class Fetcher
{
    async getBestTop20()
    {
        return ``;
    }

    async getPopularTop20()
    {
        return ``;
    }

    async getSeries()
    {
        return ``;
    }

    async searchMedia(mediaName)
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${mediaName}`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    sortSeriesByRating(array)
    {
        array.sort((a, b) => b.vote_average - a.vote_average);
    }
}



export class MovieFetcher extends Fetcher
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



export class SeriesFetcher extends Fetcher
{
    async getBestTop20()
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getPopularTop20()
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getSeries(seriesName)
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(seriesName)}`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }
}