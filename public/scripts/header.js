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
                <li><a href="index.html#movies">Movies</a></li>
                <li><a href="index.html#series">TV Series</a></li>
            </ul>
            <div class="search-box">
                <input type="search" class="nav-search" placeholder="Search for a TV Show..." id="js-search">
                <i class="fa-solid fa-magnifying-glass search-icon" id="js-search-btn"></i>
            </div>
        </nav>`;

    const openMenuBtn = document.querySelector(".open-menu-mobile");
    const closeMenuBtn = document.querySelector(".close-menu-mobile");
    const mobileNavBar = document.querySelector(".navbar-mobile");
    const mobileNavBarButtons = mobileNavBar.querySelectorAll("li");

    openMenuBtn.addEventListener("click", () => 
    {
        mobileNavBar.classList.toggle("navbar-active");
    });

    closeMenuBtn.addEventListener("click", () => 
    {
        mobileNavBar.classList.toggle("navbar-active");
    });

    mobileNavBarButtons.forEach((btn) =>
    {
        btn.addEventListener("click", () =>
        {
            mobileNavBar.classList.toggle("navbar-active");
        })
    });
}