import { Fetcher } from "../data/fetcher.js";
import { Movie, Series } from "../data/media.js";

const mediaPage = document.querySelector(".media-page");

displayMediaInformation(getMediaId(), getMediaType());

async function displayMediaInformation(id, type)
{
    const fetcher = new Fetcher();
    const data = await fetcher.getMedia(id, type);

    const mediaData =
    {
        mediaLanguage: data.original_language,
        mediaId: data.id,
        mediaTitle: (data.title === undefined) ? data.name : data.title,
        mediaDescription: data.overview,
        mediaPopularity: data.popularity,
        mediaRating: (data.vote_average === undefined) ? data : data.vote_average,
        mediaPosterPath: data.poster_path,
        mediaType: type,
        mediaGenres: data.genres,
    }

    const media = (type === "series") ? new Series(mediaData) : new Movie(mediaData);
    console.log(media);

    let genresText = "";
    media.mediaGenres.forEach((genre, index) => 
    {
        if(media.mediaGenres.length == 1)
        {
            genresText = genre.name;
        }
        else if(index == media.mediaGenres.length - 1)
        {
            genresText += ' ' + "and" + ' ' + genre.name;
        }
        else if(index == media.mediaGenres.length - 2)
        {
            genresText += genre.name;
        }
        else
        {
            genresText += genre.name + ',' + ' ';
        }
    });

    let mediaPageHTML = `
                <div class="media">

                <div class="media-image">
                    <img src="${media.getImageURL(media.mediaPosterPath)}" alt="${media.mediaTitle + ' ' +"image"}">
                </div>

                <div class="media-title">
                    <h1>${media.mediaTitle}</h1>
                    <h2>Rating: <span class="rating">${media.mediaRating}</span></h2>
                    <h2>Genres: <span class="genres">${genresText}</span></h2>
                </div>

                <div class="media-description">
                    <h1>Description</h1>
                    <hr>
                    <p>${(media.mediaDescription === "") ? "Description not included." : media.mediaDescription}</p>
                </div>

            </div>`
    mediaPage.innerHTML = mediaPageHTML;
}

function getMediaId()
{
    const currentPath = new URL(window.location.href);
    const mediaId = currentPath.searchParams.get("id");
    return mediaId;
}

function getMediaType()
{
    const currentPath = new URL(window.location.href);
    const mediaType = currentPath.searchParams.get("type");
    return mediaType;
}