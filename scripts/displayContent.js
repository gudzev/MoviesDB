import { Series, Movie } from "../data/media.js";
import { SeriesFetcher, MovieFetcher } from "../data/fetcher.js";
import { makeMediasOpenable } from "../functions/makeMediaOpenable.js";

Promise.all(
    [
    displayContent(`popular`, `movie`),
    displayContent(`best`, `movie`),
    displayContent(`popular`, `series`),
    displayContent(`best`, `series`),
    ]
).then(() =>
{
    makeMediasOpenable();
});


async function displayContent(listType, mediaType)
{
    const fetcher = (mediaType === `series`) ? new SeriesFetcher() : new MovieFetcher();
    const data = (listType === `best`) ? await fetcher.getBestTop20() : await fetcher.getPopularTop20();
    const dataResults = data.results;

    const mediaContainer = document.querySelector(`.js-${listType}-${mediaType}-top-20`);

    fetcher.sortSeriesByRating(dataResults);

    let mediaContainerHTML = ``;

    dataResults.forEach((entry) =>
    {
        const mediaData =
        {
            mediaLanguage: entry.original_language,
            mediaId: entry.id,
            mediaTitle: (mediaType === `series`) ? entry.name : entry.title,
            mediaDescription: entry.overview,
            mediaPopularity: entry.popularity,
            mediaRating: entry.vote_average,
            mediaPosterPath: entry.poster_path,
            mediaType: entry.media_type,
            mediaGenre: entry.genres,
        }

        const media = (mediaType === `series`) ? new Series(mediaData) : new Movie(mediaData);

        mediaContainerHTML += `
        <div class="movie" data-media-id=${media.mediaId} data-media-type=${mediaType}>
            <img src="${media.getImageURL(media.mediaPosterPath)}" class="movie-img" alt="Movie Image">
            <h2 class="movie-title">${media.formatTitle(media.mediaTitle)}</h2>
            <h2 class="movie-rating">Rating: ${media.mediaRating}</h2>
        </div>`
    });

    mediaContainer.innerHTML += mediaContainerHTML;

    const sliderRight = document.querySelector(`.slider-right-${listType}-${mediaType}`);
    const sliderLeft = document.querySelector(`.slider-left-${listType}-${mediaType}`);

    sliderRight.addEventListener("click", () =>
    {
        mediaContainer.scrollBy(getScrollLength(), 0);
    });

    sliderLeft.addEventListener("click", () =>
    {
        mediaContainer.scrollBy(-getScrollLength(), 0);
    });

    function getScrollLength() 
    {
        const movieItem = mediaContainer.querySelector(".movie");
        const itemStyle = getComputedStyle(movieItem);
    
        const movieWidth = movieItem.offsetWidth;
        const marginRight = parseFloat(itemStyle.marginRight) || 0;
    
        const totalItemWidth = movieWidth + marginRight;
    
        const visibleWidth = mediaContainer.clientWidth;
        const itemsPerPage = Math.floor(visibleWidth / totalItemWidth);
    
        const scrollAmount = totalItemWidth * itemsPerPage;
    
        if(itemsPerPage <= 3)
        {
            return scrollAmount + 17;
        }
        else
        {
            return scrollAmount + 50;
        }
    }
    
}
