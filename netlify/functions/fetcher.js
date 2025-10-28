const { options } = require('./api');

class Fetcher
{
    methods =
    {
        getMovie: "https://api.themoviedb.org/3/movie/",
        getSeries: "https://api.themoviedb.org/3/tv/",
    }

    // Search for any movie/tv series using their name
    async searchMedia(mediaName, page)
    {
        try
        {
            const request = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(mediaName)}`, options);
            const data = await request.json();
            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getMovieById(movieId)
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

    async getSeriesById(seriesId)
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
                return await this.getMovieById(id)
            }
            else
            {
                return await this.getSeriesById(id);
            } 
        }
        catch(error)
        {
            console.log(error);
        }
    }
}



class MovieFetcher extends Fetcher
{
    movieLinks = 
    {
        topRated: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        mostPopular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        getMovie: "https://api.themoviedb.org/3/movie/",
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



class TVFetcher extends Fetcher
{
    seriesLinks = 
    {
        topRated: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        mostPopular: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        getSeries: "https://api.themoviedb.org/3/tv/",
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
}

module.exports = 
{
  Fetcher,
  MovieFetcher,
  TVFetcher
};