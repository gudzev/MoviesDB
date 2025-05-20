import { options } from "../api/api.js";

export class Fetcher
{
    methods =
    {
        getMovie: "https://api.themoviedb.org/3/movie/",
        getSeries: " https://api.themoviedb.org/3/tv/",
    }

    async searchMedia(mediaName)
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(mediaName)}`, options);
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

    async getMovie(movieId)
    {
        try
        {
            const request = await fetch(this.methods.getMovie + encodeURIComponent(movieId), options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getSeries(seriesId)
    {
        try
        {
            const request = await fetch(this.methods.getSeries + encodeURIComponent(seriesId), options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getMedia(id, type)
    {
        try
        {
            if(type === "movie")
            {
                return await this.getMovie(id)
            }
            else
            {
                return await this.getSeries(id);
            } 
        }
        catch(error)
        {
            console.log(error);
        }
    }
}



export class MovieFetcher extends Fetcher
{
    movieLinks = 
    {
        baseLink: "https://api.themoviedb.org/3/movie",
        topRated: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        mostPopular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    };

    async getPopularTop20()
    {
        try
        {
            const request = await fetch(this.movieLinks.mostPopular, options);
            let data = await request.json();
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
            const request = await fetch(this.movieLinks.topRated, options);
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
    seriesLinks = 
    {
        baseLink: "https://api.themoviedb.org/3/tv",
        topRated: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        mostPopular: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    };

    async getBestTop20()
    {
        try
        {
            const request = await fetch(this.seriesLinks.topRated, options);
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
            const request = await fetch(this.seriesLinks.mostPopular, options);
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
            const request = await fetch(this.seriesLinks.getSeries + encodeURIComponent(seriesName), options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }
}