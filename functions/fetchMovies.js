import {options} from "../api/api.js";

export async function getPopularTop20()
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

export async function getMovie(movieName)
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

export async function getBestTop20()
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

// Old code.
// Use MovieFetcher() class, defined in data/movie.js
