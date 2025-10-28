import {orderDisplayedResults} from "./searchResults.js"

const dropDownItemsContainer = document.querySelector(".dropdown-items-container");
const dropDownOptions = dropDownItemsContainer.querySelectorAll("li");
const dropDownBtn = document.querySelector(".dropdown-btn");
const dropdown = document.querySelector(".dropdown");

dropDownBtn.addEventListener("click", () =>
{
    dropDownItemsContainer.classList.toggle("active");
});

dropDownOptions[0].addEventListener("click", () =>
{
    // descending
    orderDisplayedResults("desc");
    dropDownItemsContainer.classList.remove("active");
});

dropDownOptions[1].addEventListener("click", () =>
{
    // ascending
    orderDisplayedResults("asc");
    dropDownItemsContainer.classList.remove("active");
});

document.addEventListener("click", (e) =>
{
    if(!dropdown.contains(e.target))
    {
        dropDownItemsContainer.classList.remove("active");
    }
})