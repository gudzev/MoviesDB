import { Fetcher } from "../data/fetcher.js";
import { Media } from "../data/media.js";

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
    }

    const media = new Media(mediaData);

    let mediaPageHTML = `
                <div class="media">

                <div class="media-image">
                    <img src="${media.getImageURL(media.mediaPosterPath)}" alt="${media.mediaTitle + ' ' +"image"}">
                </div>

                <div class="media-title">
                    <h1>${media.mediaTitle}</h1>
                    <h2>Rating: ${media.mediaRating}</h2>
                </div>

                <div class="media-description">
                    <h1>Description</h1>
                    <hr>
                    <p>${media.mediaDescription}</p>
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