/**til forside karusel java - Julie */
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

/***accordions java */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

const carousel = document.querySelector(".carousel");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");

rightBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});

/************dato karusel**** */

const datesContainer = document.getElementById("datesContainer");
const monthYear = document.getElementById("monthYear");

const danishDays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
const events = ["2025-01-27", "2025-01-30"]; // example events

let currentDate = new Date();
let startX = 0;

function renderDates() {
  datesContainer.innerHTML = "";

  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));

  monthYear.textContent = monday.toLocaleDateString("da-DK", {
    month: "long",
    year: "numeric",
  });

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const div = document.createElement("div");
    div.className = "date-item";

    const iso = date.toISOString().split("T")[0];

    if (date.toDateString() === currentDate.toDateString()) {
      div.classList.add("active");
    }

    if (date < new Date().setHours(0, 0, 0, 0)) {
      div.classList.add("disabled");
    }

    if (events.includes(iso)) {
      div.classList.add("event");
    }

    div.innerHTML = `
      <div class="day">${danishDays[i]}</div>
      <div class="number">${date.getDate()}</div>
    `;

    div.onclick = () => {
      currentDate = date;
      renderDates();
    };

    datesContainer.appendChild(div);
  }
}

/* Navigation */
document.getElementById("prev").onclick = () => {
  currentDate.setDate(currentDate.getDate() - 7);
  renderDates();
};

document.getElementById("next").onclick = () => {
  currentDate.setDate(currentDate.getDate() + 7);
  renderDates();
};

document.getElementById("todayBtn").onclick = () => {
  currentDate = new Date();
  renderDates();
};

/* Swipe support */
datesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

datesContainer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) currentDate.setDate(currentDate.getDate() + 7);
  if (endX - startX > 50) currentDate.setDate(currentDate.getDate() - 7);
  renderDates();
});

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") currentDate.setDate(currentDate.getDate() + 1);
  if (e.key === "ArrowLeft") currentDate.setDate(currentDate.getDate() - 1);
  renderDates();
});

renderDates();
