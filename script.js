const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

sunIcon.addEventListener("click", (e) => {
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
});

moonIcon.addEventListener("click", (e) => {
  moonIcon.classList.add("hidden");
  sunIcon.classList.remove("hidden");
});
