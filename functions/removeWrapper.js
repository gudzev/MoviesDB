export function removeWrapper()
{
    const wrapper = document.querySelector(".wrapper");

    if(wrapper)
    {
        setTimeout(() => wrapper.remove(), 100);
    }
};
