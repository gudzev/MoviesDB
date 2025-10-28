import { Movie, Series } from "../models/media.js";
import { makeMediasOpenable } from "../functions/makeMediaOpenable.js";
import { removeWrapper } from "../../functions/removeWrapper.js";

Promise.all(
    [
    displayContent(`popular`, `movie`),
    displayContent(`best`, `movie`),
    displayContent(`popular`, `tv`),
    displayContent(`best`, `tv`),
    ]
).then(() =>
{
    makeMediasOpenable();
    removeWrapper();
});


async function displayContent(listType, mediaType) 
{
  const actions = 
  {
    popular: "getPopularTop20",
    best: "getBestTop20",
  };
  
  const action = actions[listType];

  try 
  {
    const response = await fetch(`/.netlify/functions/backend?type=${mediaType}&action=${action}`);
    const data = await response.json();
    const dataResults = data.results;
    dataResults.sort((a,b) => b.vote_average - a.vote_average);

    const mediaContainer = document.querySelector(`.js-${listType}-${mediaType}-top-20`);


    let mediaContainerHTML = "";

    dataResults.forEach((entry) => 
      {
        const mediaData = 
        {
          mediaLanguage: entry.original_language,
          mediaId: entry.id,
          mediaTitle: mediaType === "tv" ? entry.name : entry.title,
          mediaDescription: entry.overview,
          mediaPopularity: entry.popularity,
          mediaRating: entry.vote_average,
          mediaPosterPath: entry.poster_path,
          mediaType: mediaType,
          mediaGenre: entry.genres,
        };

        const media = (mediaData.mediaType === "tv") ? new Series(mediaData) : new Movie(mediaData);

        mediaContainerHTML += `
          <div class="movie" data-media-id=${media.mediaId} data-media-type=${mediaType}>
              <img src="https://image.tmdb.org/t/p/w500${media.mediaPosterPath}" class="movie-img" alt="Movie Image">
              <h2 class="movie-title">${media.mediaTitle}</h2>
              <h2 class="movie-rating">Rating: ${media.mediaRating}</h2>
          </div>
        `;
    });

    mediaContainer.innerHTML += mediaContainerHTML;

    const sliderRight = document.querySelector(`.slider-right-${listType}-${mediaType}`);
    const sliderLeft = document.querySelector(`.slider-left-${listType}-${mediaType}`);

    sliderRight.addEventListener("click", () => {
      mediaContainer.scrollBy(getScrollLength(), 0);
    });

    sliderLeft.addEventListener("click", () => {
      mediaContainer.scrollBy(-getScrollLength(), 0);
    });

    function getScrollLength() {
      const movieItem = mediaContainer.querySelector(".movie");
      const itemStyle = getComputedStyle(movieItem);

      const movieWidth = movieItem.offsetWidth;
      const marginRight = parseFloat(itemStyle.marginRight) || 0;

      const totalItemWidth = movieWidth + marginRight;

      const visibleWidth = mediaContainer.clientWidth;
      const itemsPerPage = Math.floor(visibleWidth / totalItemWidth);

      const scrollAmount = totalItemWidth * itemsPerPage;

      if (itemsPerPage <= 3)
      {
        return scrollAmount + 17;
      } 
      else 
      {
        return scrollAmount + 50;
      }
    }
  } 
  catch (error) 
  {
    console.error(error);
  }
}
