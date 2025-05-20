export function makeMediasOpenable()
{
    document.querySelectorAll(".movie").forEach((movie) =>
    {
        movie.addEventListener("click", () =>
        {
            const mediaType = movie.dataset.mediaType;
            const mediaId = movie.dataset.mediaId;
            window.open(`title.html?id=${mediaId}&type=${mediaType}`, "_self");
        });
    })
}