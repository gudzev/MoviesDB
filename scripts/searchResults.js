import {Fetcher} from "../data/fetcher.js";
import { Movie, Series } from "../data/media.js";
import { makeMediasOpenable } from "../functions/makeMediaOpenable.js";

const currentURL = new URL(window.location.href);
const search = currentURL.searchParams.get('query');

document.addEventListener("DOMContentLoaded", () =>
{
    Promise.all([displaySearchResults(search)]).then(() =>
    {
        makeMediasOpenable();
    });
});

async function displaySearchResults(search)
{
    const fetcher = new Fetcher();
    const searchResults = (await fetcher.searchMedia(search)).results;

    const resultsDiv = document.querySelector(".movie-container-wrapper");
    const numberOfResults = document.querySelector(".number-of-search-results");

    let resultsDivHTML = ``;

    if(searchResults.length > 0)
    {
        searchResults.forEach((result) => 
        {
            if(result.media_type === `person` || result.poster_path === null || result.vote_average == 0) return;

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

            resultsDivHTML += `
            <div class="movie" data-media-id=${newMedia.mediaId} data-media-type=${newMedia.mediaType}>
                <img src="${newMedia.getImageURL(newMedia.mediaPosterPath)}" class="movie-img" alt="Movie Image">
                <h2 class="movie-title">${newMedia.formatTitle(newMedia.mediaTitle)}</h2>
                <h2 class="movie-rating">Rating: <span class="movie-rating-number">${newMedia.mediaRating}</span></h2>
            </div>`
        });
    }
    else
    {
        resultsDivHTML = `<h1 class="no-results">No matches. Try again</h1>`;
    }

    resultsDiv.innerHTML = resultsDivHTML;
    numberOfResults.innerHTML = `(${document.querySelectorAll(".movie").length})` || '0';
}


export function orderDisplayedResults(orderBy)
{
    const ratings = Array.from(document.querySelectorAll(".movie-rating-number"));
    const resultsDiv = document.querySelector(".movie-container-wrapper");
    const MoviesCount = ratings.length;

    //                     //
    //      Important      //
    //                     //

    // My original way to sort movies didn't work. Why?

    // I was getting ratings with querySelectorAll(),
    // which returns a NodeList.

    // A NodeList doesn’t update its order or length
    // when you move or add elements in the DOM.

    // Better solution: convert to an Array with Array.from(),
    // swap indexes in that Array during sorting,
    // then apply that sorted order back to the DOM.
    // This way no movie gets "lost" and sorting works as intended.


    for(let i = 0; i < MoviesCount; i++)
    {
        for(let j = 0; j < MoviesCount; j++)
        {
            let x = ratings[i];
            let y = ratings[j];

            if(orderBy === "asc" ? parseFloat(x.innerText) > parseFloat(y.innerText) : parseFloat(x.innerText) < parseFloat(y.innerText))
            {
                resultsDiv.insertBefore(x.closest(".movie"), y.closest(".movie"));
                [ratings[i], ratings[j]] = [ratings[j], ratings[i]];
            }
        }
    }
}