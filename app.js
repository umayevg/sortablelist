const list = document.getElementById("list");
const orderBtn = document.getElementById("check");

const companies = [
  "Apple",
  "Microsoft ",
  "Saudi Aramco",
  "Alphabet",
  "Amazon",
  "Tesla",
  "Berkshire Hathaway",
  "Meta Platforms (Facebook)",
  "Taiwan Semiconductor",
  "NVIDIA",
  "Tencent Holdings",
  "Visa",
  "JP Morgan Chase",
  "United Health Group",
  "Johnson & Johnson",
  "Samsung",
  "Bank of America",
  "LVMH",
  "Walmart",
  "Procter & Gamble",
];

const companyItems = [];
let startIndex;
createList(companies);

function createList(companiesArray) {
  [...companiesArray]
    .map((p) => ({ value: p, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((p) => p.value)
    .forEach((company, index) => {
      const item = document.createElement("li");
      item.setAttribute("data-index", index);
      item.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
              <p class="name">${company}</p>
              <span>&#9868;</span>
          </div>
      `;

      companyItems.push(item);
      list.appendChild(item);
    });

  addEventListeners();
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragItems = document.querySelectorAll(".list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  startIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(startIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(start, end) {
  const one = companyItems[start].querySelector(".draggable");
  const two = companyItems[end].querySelector(".draggable");

  companyItems[start].appendChild(two);
  companyItems[end].appendChild(one);
}

orderBtn.addEventListener("click", checkOrder);

function checkOrder() {
  companyItems.forEach((item, index) => {
    const name = item.querySelector(".draggable .name").innerText;

    if (name !== companies[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}
