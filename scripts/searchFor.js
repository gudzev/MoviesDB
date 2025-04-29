import { Fetcher } from "../data/fetcher.js";

const searchInput = document.querySelector("#js-search");
const searchBtn = document.querySelector("#js-search-btn");

searchBtn.addEventListener("click", () =>
{
    openWindow(searchInput.value);
})

searchInput.addEventListener("keydown", (event) =>
{
    if(event.key === `Enter`)
    {
        openWindow(searchInput.value)
    }
})

async function openWindow(inputString)
{
    window.open(`search.html?query=${encodeURIComponent(inputString)}`, "_self");
}
