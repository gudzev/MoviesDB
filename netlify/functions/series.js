const { TVFetcher } = require('./fetcher');

exports.handleSeriesRequest = async function(event) 
{
  const seriesID = event.queryStringParameters?.id;
  const action = event.queryStringParameters?.action;

  const fetcher = new TVFetcher();

  // displayContent.js
  if(action) 
  {
    let data;

    if(action === "getPopularTop20") 
    {
      data = await fetcher.getPopularTop20();
    }
    else if(action === "getBestTop20") 
    {
      data = await fetcher.getBestTop20();
    } 
    else 
    {
      return {
        statusCode: 400,
        body: JSON.stringify("Required action doesn't exist!"),
        headers: { "Content-Type": "application/json" },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  }

  // displayMediaInformation.js
  if(seriesID)
  {
    const data = await fetcher.getSeriesById(seriesID);
    
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: { "Content-Type" : "application/json"},
    }
  }

  // If there are no actions or series
  return {
    statusCode: 400,
    body: JSON.stringify("Unknown intention!"),
    headers: { "Content-Type": "application/json" },
  };
};
