displayHeader();

function displayHeader()
{
    const header = document.querySelector("header");

    header.innerHTML = `
        <nav>
            <i class="fa-solid fa-bars open-menu-mobile hidden"></i>
            <ul class="navbar-mobile">
                <i class="fa-solid fa-xmark close-menu-mobile hidden"></i>
                <li><a class="main-link" href="index.html">MoviesDB</a></li>
                <li><a href="#">Home</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
            </ul>
            <div class="search-box">
                <input type="search" class="nav-search">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
        </nav>`;

    const openMenuBtn = document.querySelector(".open-menu-mobile");
    const closeMenuBtn = document.querySelector(".close-menu-mobile");
    const mobileNavBar = document.querySelector(".navbar-mobile");

    document.addEventListener("DOMContentLoaded", () => 
    {
        openMenuBtn.addEventListener("click", () => 
        {
            mobileNavBar.classList.toggle("navbar-active");
        });

        closeMenuBtn.addEventListener("click", () => 
        {
            mobileNavBar.classList.toggle("navbar-active");
        });
    });
}