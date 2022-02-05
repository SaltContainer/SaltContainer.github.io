var currentCounter = 0;

function addCounter() {
    var counters = document.getElementById("counters");
    var newCounterName = document.getElementById("new-counter-name");

    var newCounter = document.createElement("div");
    newCounter.classList.add("col-lg-6");

    var counterName = document.createElement("h3");
    var counterNameText = document.createTextNode(newCounterName.value);
    counterName.appendChild(counterNameText);
    newCounter.appendChild(counterName);

    var minusButton = document.createElement("a");
    minusButton.classList.add("btn");
    minusButton.classList.add("btn-primary");
    minusButton.classList.add("btn-lg");
    minusButton.classList.add("counter-button");
    minusButton.setAttribute("onclick", "increment(" + currentCounter + ", -1)");
    minusButton.setAttribute("role", "button");
    var minusButtonText = document.createTextNode("-");
    minusButton.appendChild(minusButtonText);
    newCounter.appendChild(minusButton);

    var plusButton = document.createElement("a");
    plusButton.classList.add("btn");
    plusButton.classList.add("btn-primary");
    plusButton.classList.add("btn-lg");
    plusButton.classList.add("counter-button");
    plusButton.setAttribute("onclick", "increment(" + currentCounter + ", 1)");
    plusButton.setAttribute("role", "button");
    var plusButtonText = document.createTextNode("+");
    plusButton.appendChild(plusButtonText);
    newCounter.appendChild(plusButton);

    var counterNumber = document.createElement("p");
    counterNumber.classList.add("counter-number");
    counterNumber.id = "counter-" + currentCounter.toString();
    var counterNumberText = document.createTextNode("0");
    counterNumber.appendChild(counterNumberText);
    newCounter.appendChild(counterNumber);

    counters.appendChild(newCounter);

    currentCounter++;
}

function increment(counterId, num) {
    var currentNumElement = document.getElementById("counter-" + counterId);
    var currentNum = currentNumElement.childNodes[0].textContent;
    var currentNumInt = parseInt(currentNum);
    currentNumInt += num;
    currentNumElement.childNodes[0].textContent = currentNumInt.toString();
}