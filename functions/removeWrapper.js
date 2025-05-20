window.addEventListener("load", () => 
{
    const wrapper = document.querySelector(".wrapper");

    if(wrapper)
    {
        setTimeout(() => wrapper.remove(), 350);
    }
});
