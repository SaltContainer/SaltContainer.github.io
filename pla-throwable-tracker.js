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
    list = document.getElementById("list");
    count = list.querySelectorAll('input[type="checkbox"]:checked').length;
    counter = document.getElementById("x");

    counter.textContent = count;
});

function togglecompact() {
    check = document.getElementById("compact-option");
    var labels = document.getElementsByClassName("clickable-label");
    if (check.checked) {
        for (var i=0; i<labels.length; i++) {
            labels[i].classList.add("removed");
        }
    } else {
        for (var i=0; i<labels.length; i++) {
            labels[i].classList.remove("removed");
        }
    }
}