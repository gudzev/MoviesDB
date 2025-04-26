import {options} from "../api/api.js";

getTop20();
getMovie("The Stranger Things");

async function getTop20()
{
    try
    {
        const request = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        let data = await request.json();
    
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function getMovie(movieName)
{
    try
    {
        const request = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
        const data = await request.json();

        console.log(data);
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}
