window.addEventListener("load", () => {
    const list = document.getElementById("list");
    orig = Array.from(list.children).filter(x => !x.classList.contains("grid-separator"));

    const sepLineDiv = document.getElementById("sepLine");
    if(sepLine) {
        sepLineDiv.classList.add("removed");
    }
    else {
        sepLineDiv.classList.remove("removed");
    }
});

window.addEventListener("click", () => {
    let count = document.querySelectorAll('input[type="checkbox"]:checked').length;
    let counter = document.getElementById("x");

    counter.textContent = count;
});