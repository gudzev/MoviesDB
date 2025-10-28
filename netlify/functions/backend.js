const { handleMovieRequest } = require('./movie');
const { handleSeriesRequest } = require('./series');
const { Fetcher } = require("./fetcher");

exports.handler = async function(event)
{
  const type = event.queryStringParameters?.type;
  const query = event.queryStringParameters?.query;
  const page = event.queryStringParameters?.page;

  // If there is a search by words for a tv series/movies, do:
  if(query)
  {
    const fetcher = new Fetcher();

    const data = await fetcher.searchMedia(query, page);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  }

  // netlify/functions/movie.js
  if (type === 'movie') 
  {
    return await handleMovieRequest(event);
  }

  // netlify/functions/series.js
  if (type === 'tv') 
  {
    return await handleSeriesRequest(event);
  }

  // If neither if() is fullfiled, return an error
  return {
    statusCode: 400,
    body: JSON.stringify("Invalid or missing 'type' parameter"),
    headers: { "Content-Type": "application/json" },
  };
};
