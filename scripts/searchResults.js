import {Fetcher} from "../data/fetcher.js";
import { Movie, Series } from "../data/media.js";

const currentURL = new URL(window.location.href);
const search = currentURL.searchParams.get('query');

document.addEventListener("DOMContentLoaded", () =>
{
    displaySearchResults(search);
});

async function displaySearchResults(search)
{
    const fetcher = new Fetcher();
    const searchResults = (await fetcher.searchMedia(search)).results;
    const resultsDiv = document.querySelector(".movie-container-wrapper");

    let resultsDivHTML = ``;

    if(searchResults.length > 0)
    {
        searchResults.forEach((result) => 
        {
            if(result.media_type === `person` || result.poster_path === null) return;

            const mediaData =
            {
                mediaId: result.id,
                mediaTitle: (result.media_type === `movie`) ? result.title : result.name,
                mediaRating: result.vote_average,
                mediaPosterPath: result.poster_path,
                mediaLanguage: result.original_language,
                mediaPopularity: result.popularity,
                mediaDescription: result.overview,
                mediaType: result.media_type,
            };

            const newMedia = (mediaData.mediaType === `movie`) ? new Movie(mediaData) : new Series(mediaData);

            console.log(newMedia);

            resultsDivHTML += `
            <div class="movie">
                <img src="${newMedia.getImageURL(newMedia.mediaPosterPath)}" class="movie-img" alt="Movie Image">
                <h2 class="movie-title">${newMedia.mediaTitle}</h2>
                <h2 class="movie-rating">Rating: ${newMedia.mediaRating}</h2>
            </div>`
        });
    }
    else
    {
        resultsDivHTML = `No matches. Try again`;
    }

    resultsDiv.innerHTML = resultsDivHTML;
}