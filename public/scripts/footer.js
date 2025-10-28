displayFooter();

function displayFooter()
{
    const footer = document.querySelector('footer');

    footer.innerHTML = `
        <div class="footer-container">
            <div class="copyright">
                Copyright &copy; Marko Gudžev. All Rights Deserved
            </div>
    
            <div class="contact">
                <h1>Contact me on:</h1>
                
                <div class="contact-icons">
                    <a class="fa-brands fa-square-github contact-icon" href="https://github.com/gudzev/" aria-label="GitHub" target="_blank" aria-hidden="false"></a>
                    <a class="fa-solid fa-envelope contact-icon" href="mailto:mgudzev@gmail.com" aria-label="E-Mail" target="_blank" aria-hidden="false"></a>
                </div>
            </div>
    
            <div class="tmdb">
                Using data provided by <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB API">
            </div>
        </div>`
}